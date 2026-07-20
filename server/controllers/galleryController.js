const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

// Helper to delete file from disk
const deleteFile = (relativePath) => {
  if (!relativePath) return;
  if (!relativePath.startsWith('/uploads/')) return;
  const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
  const absolutePath = path.join(__dirname, '..', cleanPath);
  if (fs.existsSync(absolutePath)) {
    try {
      fs.unlinkSync(absolutePath);
    } catch (err) {
      console.error('Failed to delete file from disk:', err);
    }
  }
};

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
exports.getAllGalleryImages = async (req, res) => {
  try {
    const filter = req.query.albumId ? { albumId: req.query.albumId } : {};
    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving gallery items', error: error.message });
  }
};

// @desc    Upload gallery image
// @route   POST /api/gallery/upload
// @access  Private (Admin Only)
exports.uploadGalleryImage = async (req, res) => {
  try {
    const { title, albumId } = req.body;
    if (!title || !albumId) {
      return res.status(400).json({ message: 'Required fields: title, albumId' });
    }

    let image = '';
    if (req.file) {
      image = `/uploads/gallery/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    } else {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const item = await Gallery.create({
      albumId,
      image,
      title
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

// @desc    Update gallery image (Edit title / Move album)
// @route   PUT /api/gallery/:id
// @access  Private (Admin Only)
exports.updateGalleryImage = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    if (req.body.title !== undefined) item.title = req.body.title;
    if (req.body.albumId !== undefined) item.albumId = req.body.albumId;

    if (req.file) {
      deleteFile(item.image);
      item.image = `/uploads/gallery/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      if (req.body.image !== item.image) {
        deleteFile(item.image);
      }
      item.image = req.body.image;
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating gallery item', error: error.message });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin Only)
exports.deleteGalleryImage = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Delete image file from server storage
    deleteFile(item.image);

    // Delete from database
    await Gallery.deleteOne({ _id: req.params.id });

    res.json({ message: 'Gallery image removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing gallery item', error: error.message });
  }
};

// @desc    Get storage usage of gallery files
// @route   GET /api/gallery/storage
// @access  Private (Admin Only)
exports.getStorageUsage = async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, '../uploads/gallery');
    let totalSize = 0;
    
    if (fs.existsSync(uploadDir)) {
      const files = fs.readdirSync(uploadDir);
      files.forEach(file => {
        const filePath = path.join(uploadDir, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          totalSize += stats.size;
        }
      });
    }

    // Size in GB
    const sizeInGB = totalSize / (1024 * 1024 * 1024);
    res.json({
      sizeInBytes: totalSize,
      sizeInGB: parseFloat(sizeInGB.toFixed(6)),
      limitInGB: 10
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating storage size', error: error.message });
  }
};
