const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

router.get('/', authenticate, authorize(['admin']), dashboardController.getAdminDashboard);

module.exports = router;
