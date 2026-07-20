const SuccessStory = require('../models/SuccessStory');

// @desc    Get all success stories
// @route   GET /api/success-stories
// @access  Public
exports.getAllSuccessStories = async (req, res) => {
  try {
    const filter = req.query.active === 'true' ? { status: true } : {};
    const stories = await SuccessStory.find(filter).sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving success stories', error: error.message });
  }
};

// @desc    Create success story
// @route   POST /api/success-stories
// @access  Private (Admin Only)
exports.createSuccessStory = async (req, res) => {
  try {
    const { studentName, title, description, youtubeUrl, thumbnail, status } = req.body;
    if (!studentName || !title || !description || !youtubeUrl) {
      return res.status(400).json({ message: 'Required fields: studentName, title, description, youtubeUrl' });
    }

    const story = await SuccessStory.create({
      studentName,
      title,
      description,
      youtubeUrl,
      thumbnail: thumbnail || '',
      status: status !== undefined ? status : true
    });

    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: 'Error creating success story', error: error.message });
  }
};

// @desc    Update success story
// @route   PUT /api/success-stories/:id
// @access  Private (Admin Only)
exports.updateSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Success story not found' });
    }

    if (req.body.studentName !== undefined) story.studentName = req.body.studentName;
    if (req.body.title !== undefined) story.title = req.body.title;
    if (req.body.description !== undefined) story.description = req.body.description;
    if (req.body.youtubeUrl !== undefined) story.youtubeUrl = req.body.youtubeUrl;
    if (req.body.thumbnail !== undefined) story.thumbnail = req.body.thumbnail;
    if (req.body.status !== undefined) story.status = req.body.status;

    const updatedStory = await story.save();
    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating success story', error: error.message });
  }
};

// @desc    Delete success story
// @route   DELETE /api/success-stories/:id
// @access  Private (Admin Only)
exports.deleteSuccessStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Success story not found' });
    }
    await SuccessStory.deleteOne({ _id: req.params.id });
    res.json({ message: 'Success story removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing success story', error: error.message });
  }
};
