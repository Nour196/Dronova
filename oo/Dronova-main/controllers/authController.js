const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../Utils/email");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const { CustomError } = require("../Utils/customError");
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcryptjs');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register a new user
const register = asyncErrorHandler(async (req, res, next) => {
    const { name, email, phone, password, confirmPassword} = req.body;
    
    // Set role based on email
    const role = email === 'sohaibmekersi1@gmail.com' ? 'admin' : 'customer';

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
    const newUser = new User({ 
        name, 
        email, 
        phone, 
        password, 
        confirmPassword,
        role // Add the role to the user
    });
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

    // Set role based on email
    if (email.toLowerCase() === 'sohaibmekersi1@gmail.com') {
        user.role = 'admin';
        await user.save();
        console.log('Admin user logged in:', email);
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.confirmPassword;

    res.status(200).json({
        message: "Login successful",
        token,
        user: userResponse,
        role: user.role // Explicitly include role in response
    });
});

// Forgot password
const forgotPassword = asyncErrorHandler(async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new CustomError('We could not find the user with given email', 404));
        }

        const plainToken = user.createResetPasswordToken();
        console.log("the token",plainToken);
        await user.save({ validateBeforeSave: false });

        const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';
        const resetUrl = `${FRONTEND_URL}/new-password/${plainToken}`;

        const message = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1895F0;">Password Reset Request</h2>
                <p>You requested a password reset.</p>
                <p>Please click the button below to reset your password:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" 
                       style="display: inline-block; 
                              padding: 12px 24px; 
                              background-color: #1895F0; 
                              color: white; 
                              text-decoration: none; 
                              border-radius: 5px;
                              font-weight: bold;">
                        Reset Password
                    </a>
                </div>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #1895F0;">${resetUrl}</p>
                <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
            </div>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message
            });

            res.status(200).json({
                status: 'success',
                message: 'Password reset link sent to your email'
            });
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined;
            await user.save({ validateBeforeSave: false });

            return next(new CustomError('There was an error sending the email. Please try again later.', 500));
        }
    } catch (err) {
        console.error('Forgot password error:', err);
        return next(new CustomError('Error processing password reset request', 500));
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

// Google authentication
  googleAuth = asyncErrorHandler(async (req, res, next) => {
    try {
        const { token: googleToken } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            const randomPassword = Math.random().toString(36).slice(-8);
            user = await User.create({
                email,
                name,
                password: randomPassword,
                confirmPassword: randomPassword,
                googleId,
                profilePicture: picture,
                role: email === 'sohaibmekersi1@gmail.com' ? 'admin' : 'customer'
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Remove password from response
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            message: 'Google authentication successful',
            token: jwtToken,
            user
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(401).json({
            status: 'error',
            message: 'Google authentication failed'
        });
    }
});

module.exports = { 
    register, 
    login, 
    forgotPassword, 
    resetPassword,
    googleAuth 
};

