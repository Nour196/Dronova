const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const reportController = require("../controllers/reportController");
const router = express.Router();

// Create - Admin only
router.post("/", authenticate, authorize(['admin']), reportController.createReport);

// Get All Reports - Admin Only
router.get("/", authenticate, authorize(['admin']), reportController.getAllReports);

// Get Report by ID - Admin or Owner of the Report
router.get("/:id", authenticate, reportController.getReportById);

// Update - Admin only
router.put("/:id", authenticate, authorize(['admin']), reportController.updateReport);

// Delete - Admin only
router.delete("/:id", authenticate, authorize(['admin']), reportController.deleteReport);


module.exports = router;