const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/adminController");

// مسار تسجيل دخول الأدمن
router.post("/login", adminLogin);

module.exports = router;
