const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");  // إذا كنت تستخدم التوكن لإعادة تعيين كلمة المرور مثل في `User.js`

// تعريف مخطط الأدمين (Admin Schema)
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, minlength: 6, select: false }, // إخفاء كلمة المرور عند استرجاع الأدمين
    confirmPassword: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'admin' // دور افتراضي للأدمين
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date
});

// تشفير كلمة المرور قبل الحفظ
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // لا تقم بالتشفير إلا إذا تغيرت كلمة المرور
    
    this.password = await bcrypt.hash(this.password, 10); // تشفير كلمة المرور باستخدام bcrypt
    next();
});

// التحقق من كلمة المرور عند تسجيل الدخول
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// إنشاء رمز إعادة تعيين كلمة المرور
adminSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    // هاش الرمز لتخزينه في قاعدة البيانات
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 دقائق
    return resetToken; // إرجاع الرمز العادي
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
