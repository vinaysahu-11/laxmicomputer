const Notification = require('../models/Notification');

// @desc    Get all active notifications
// @route   GET /api/notifications
// @access  Public
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notifications list', error: error.message });
  }
};

// @desc    Create notification
// @route   POST /api/notifications
// @access  Private (Admin Only)
exports.createNotification = async (req, res) => {
  try {
    const { title, content, category, status } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Required fields: title, content' });
    }

    const notification = await Notification.create({
      title,
      content,
      category: category || 'all',
      status: status || 'active'
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
};

// @desc    Update notification
// @route   PUT /api/notifications/:id
// @access  Private (Admin Only)
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (req.body.title) notification.title = req.body.title;
    if (req.body.content) notification.content = req.body.content;
    if (req.body.category) notification.category = req.body.category;
    if (req.body.status) notification.status = req.body.status;

    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private (Admin Only)
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    await Notification.deleteOne({ _id: req.params.id });
    res.json({ message: 'Notification removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing notification', error: error.message });
  }
};
