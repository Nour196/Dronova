const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

router.post("/update-roles", authenticate, authorize(['admin']), userController.updateAllUsersToCustomer);

module.exports = router;
