const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");  


const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, minlength: 6, select: false }, 
    confirmPassword: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'admin' 
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date
});


adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
    
    this.password = await bcrypt.hash(this.password, 10); 
    next();
});


adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


adminSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");


    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; 
    return resetToken; 
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
