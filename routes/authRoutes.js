// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// مسار التسجيل
router.post("/register", authController.register);

// مسار تسجيل الدخول
router.post("/login", authController.login);

//forget password
router.post('/forgotPassword', authController.forgotPassword);
//reset password
router.patch('/resetPassword', authController.resetPassword);

module.exports = router;
