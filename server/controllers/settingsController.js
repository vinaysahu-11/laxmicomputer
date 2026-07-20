const Settings = require('../models/Settings');

// @desc    Get academy settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) {
      // Create default settings if none exists
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving academy settings', error: error.message });
  }
};

// @desc    Update academy settings
// @route   PUT /api/settings
// @access  Private (Admin Only)
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create({});
    }

    if (req.body.academyName !== undefined) settings.academyName = req.body.academyName;
    if (req.body.academyEmail !== undefined) settings.academyEmail = req.body.academyEmail;
    if (req.body.academyAddress !== undefined) settings.academyAddress = req.body.academyAddress;
    if (req.body.academyPhone !== undefined) settings.academyPhone = req.body.academyPhone;
    if (req.body.academyWebsite !== undefined) settings.academyWebsite = req.body.academyWebsite;
    if (req.body.darkMode !== undefined) settings.darkMode = req.body.darkMode;
    if (req.body.autoBackups !== undefined) settings.autoBackups = req.body.autoBackups;
    if (req.body.publicAccess !== undefined) settings.publicAccess = req.body.publicAccess;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating academy settings', error: error.message });
  }
};

// @desc    Reset academy settings to default standards
// @route   POST /api/settings/reset
// @access  Private (Admin Only)
exports.factoryResetSettings = async (req, res) => {
  try {
    await Settings.deleteMany({});
    const defaultSettings = await Settings.create({});
    res.json(defaultSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error performing settings factory reset', error: error.message });
  }
};
