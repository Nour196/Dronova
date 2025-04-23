const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// مسارات CRUD للمستخدم
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);


module.exports = router;
