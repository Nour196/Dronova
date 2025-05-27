const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const reportController = require("../controllers/reportController");
const router = express.Router();

router.post("/", authenticate, authorize(['admin']), reportController.createReport);

router.get("/", authenticate, authorize(['admin']), reportController.getAllReports);

router.get("/:id", authenticate, reportController.getReportById);

router.put("/:id", authenticate, authorize(['admin']), reportController.updateReport);

router.delete("/:id", authenticate, authorize(['admin']), reportController.deleteReport);


module.exports = router;