const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // إضافة الاستيراد الخاص بـ crypto

// تعريف مخطط المستخدم (User Schema)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false
    },
    confirmPassword: { type: String, required: true },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    profilePicture: {
        type: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date
}, {
    timestamps: true
});

// تشفير كلمة المرور قبل الحفظ
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // لا تقم بالتشفير إلا إذا تغيرت كلمة المرور
    
    this.password = await bcrypt.hash(this.password, 12); // تشفير كلمة المرور باستخدام bcrypt
    next();
});

// التحقق من كلمة المرور عند تسجيل الدخول
userSchema.methods.comparePassword = async function (candidatePassword) {
    // إذا كانت كلمة المرور فارغة، نعيد false
    if (!candidatePassword) return false;
    return await bcrypt.compare(candidatePassword, this.password);
};

// إنشاء رمز إعادة تعيين كلمة المرور
userSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex"); // إنشاء رمز عشوائي باستخدام randomBytes

    // تشفير الرمز لتخزينه في قاعدة البيانات
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 دقائق
    return resetToken; // إرجاع الرمز العادي
};

const User = mongoose.model("User", userSchema);
module.exports = User;

