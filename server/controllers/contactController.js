const Contact = require('../models/Contact');

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin Only)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact list', error: error.message });
  }
};

// @desc    Create contact query (Public submission)
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Required fields: name, email, subject, message' });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      status: 'unread'
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form', error: error.message });
  }
};

// @desc    Update contact read/unread status
// @route   PUT /api/contact/:id
// @access  Private (Admin Only)
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    if (req.body.status) contact.status = req.body.status;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact message', error: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin Only)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing contact message', error: error.message });
  }
};
