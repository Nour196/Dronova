const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../Utils/email");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const { CustomError } = require("../Utils/customError");
const crypto = require('crypto');

// Register a new user
const register = asyncErrorHandler(async (req, res, next) => {
    const { name, email, phone, password, confirmPassword} = req.body;
    const role = "customer";


    // التحقق من وجود جميع الحقول المطلوبة
    if (!name || !email || !phone || !password || !confirmPassword) {
        return next(new CustomError("Please provide all required fields", 400));
    }

    // التحقق من مطابقة كلمتي المرور
    if (password !== confirmPassword) {
        return next(new CustomError("Password and Confirm Password do not match", 400));
    }

    // التحقق من وجود المستخدم مسبقًا
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new CustomError("User with this email already exists", 400));
    }

    // إنشاء مستخدم جديد وتمرير _confirmPassword
    const newUser = new User({ name, email, phone, password, confirmPassword, });
    newUser._confirmPassword = confirmPassword; // تمرير كلمة المرور للتأكيد

    await newUser.save();

    // إنشاء التوكن
    const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    // إزالة كلمة المرور من الاستجابة
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
        message: "User registered successfully",
        token,
        user: userResponse
    });
});

// Login user
const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
        return next(new CustomError("Invalid email or password", 401));
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.confirmPassword; // حذف confirmPassword أيضًا


    res.status(200).json({
        message: "Login successful",
        token,
        user: userResponse
    });
});

// Forgot password


const forgotPassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new CustomError('We could not find the user with given email', 404));
    }

    const plainToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${plainToken}`;
    const message = `We have received a password reset request. Please use the link below to reset your password:\n\n${resetUrl}\n\nThis link is valid for 10 minutes.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message
        });

        res.status(200).json({
            status: 'success',
            message: 'Password reset link sent to the user email'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new CustomError('Error sending password reset email. Please try again later', 500));
    }
});

// Reset password
const resetPassword = asyncErrorHandler(async (req, res, next) => {
    // التحقق من وجود كلمة المرور وتأكيد كلمة المرور
    const { password, confirmPassword } = req.body;

    // التحقق من وجود كلمتي المرور
    if (!password || !confirmPassword) {
        return next(new CustomError('Please provide password and confirm password', 400));
    }

    // التحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {
        return next(new CustomError('Passwords do not match', 400));
    }

    // تشفير الرمز المستلم
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new CustomError('Token is invalid or has expired', 400));
    }

    // تحديث كلمة المرور مع التأكيد
    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.status(200).json({
        status: 'success',
        message: 'Password has been reset successfully',
        token
    });
});
module.exports = { register, login, forgotPassword, resetPassword };

