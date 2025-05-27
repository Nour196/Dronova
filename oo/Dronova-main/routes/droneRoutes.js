const express = require("express");//استدعاء مكتبة express
const path = require('path');
const { authenticate, authorize } = require(path.join(__dirname, '../middleware/authMiddleware'));
const droneController = require("../controllers/droneController");//استيراد الدوال من controller
const router = express.Router();


// التحقق من أن الوظائف موجودة
console.log("Drone controller functions:", {
    createDrone: droneController.createDrone,
    getAllDrones: droneController.getAllDrones,
    getDroneById: droneController.getDroneById,
    updateDrone: droneController.updateDrone,
    deleteDrone: droneController.deleteDrone
});

//  يسمح فقط للمسؤول (create)
router.post("/", authenticate, authorize(['admin']), droneController.createDrone);

// يسمح للجميع (read)
router.get("/", authenticate, authorize(['admin', 'customer']), droneController.getAllDrones);
router.get("/:id", authenticate, authorize(['admin', 'customer']), droneController.getDroneById);

// يسمح فقط للمسؤول (update)
router.put("/:id", authenticate, authorize(['admin']), droneController.updateDrone);

//  يسمح فقط للمسؤول (delete)
router.delete("/:id", authenticate, authorize(['admin']), droneController.deleteDrone);

module.exports = router;//تصدير  للاستعمال في server.js