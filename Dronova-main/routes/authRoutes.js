const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


router.post("/register", authController.register);

router.post("/login", authController.login);

router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;
