const Album = require('../models/Album');
const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

// Helper to delete file from disk
const deleteFile = (relativePath) => {
  if (!relativePath) return;
  // Only delete if it starts with /uploads/ (indicating a local file)
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

// @desc    Get all albums
// @route   GET /api/albums
// @access  Public
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({}).sort({ name: 1 });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving albums', error: error.message });
  }
};

// @desc    Create an album
// @route   POST /api/albums
// @access  Private (Admin Only)
exports.createAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Album name is required' });
    }

    // Check if album name already exists
    const exists = await Album.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (exists) {
      return res.status(400).json({ message: `An album named "${name}" already exists` });
    }

    let coverImage = '';
    if (req.file) {
      coverImage = `/uploads/gallery/${req.file.filename}`;
    } else if (req.body.coverImage) {
      coverImage = req.body.coverImage;
    }

    const album = await Album.create({
      name,
      coverImage
    });

    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ message: 'Error creating album', error: error.message });
  }
};

// @desc    Update an album
// @route   PUT /api/albums/:id
// @access  Private (Admin Only)
exports.updateAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    if (req.body.name) {
      // Check if another album has the same name
      const exists = await Album.findOne({
        _id: { $ne: req.params.id },
        name: { $regex: new RegExp(`^${req.body.name}$`, 'i') }
      });
      if (exists) {
        return res.status(400).json({ message: `An album named "${req.body.name}" already exists` });
      }
      album.name = req.body.name;
    }

    if (req.file) {
      // Delete old cover image if it was local
      deleteFile(album.coverImage);
      album.coverImage = `/uploads/gallery/${req.file.filename}`;
    } else if (req.body.coverImage !== undefined) {
      if (req.body.coverImage !== album.coverImage) {
        deleteFile(album.coverImage);
      }
      album.coverImage = req.body.coverImage;
    }

    const updatedAlbum = await album.save();
    res.json(updatedAlbum);
  } catch (error) {
    res.status(500).json({ message: 'Error updating album', error: error.message });
  }
};

// @desc    Delete an album (and all linked images)
// @route   DELETE /api/albums/:id
// @access  Private (Admin Only)
exports.deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    // Find and delete all linked gallery images and files
    const items = await Gallery.find({ albumId: req.params.id });
    for (const item of items) {
      deleteFile(item.image);
    }
    await Gallery.deleteMany({ albumId: req.params.id });

    // Delete album cover image file
    deleteFile(album.coverImage);

    // Delete the album record
    await Album.deleteOne({ _id: req.params.id });

    res.json({ message: 'Album and all linked images removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing album', error: error.message });
  }
};
