const express = require('express');
const { getAdminStats } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

// Admin-only stats endpoint
router.get('/', protect, authorizeRoles('admin'), getAdminStats);

module.exports = router;
