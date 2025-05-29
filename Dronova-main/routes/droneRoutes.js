const express = require("express");
const path = require('path');
const { authenticate, authorize } = require(path.join(__dirname, '../middleware/authMiddleware'));
const droneController = require("../controllers/droneController");
const router = express.Router();


console.log("Drone controller functions:", {
    createDrone: droneController.createDrone,
    getAllDrones: droneController.getAllDrones,
    getDroneById: droneController.getDroneById,
    updateDrone: droneController.updateDrone,
    deleteDrone: droneController.deleteDrone
});


router.post("/", authenticate, authorize(['admin']), droneController.createDrone);


router.get("/", authenticate, authorize(['admin', 'customer']), droneController.getAllDrones);
router.get("/:id", authenticate, authorize(['admin', 'customer']), droneController.getDroneById);


router.put("/:id", authenticate, authorize(['admin']), droneController.updateDrone);


router.delete("/:id", authenticate, authorize(['admin']), droneController.deleteDrone);

module.exports = router;