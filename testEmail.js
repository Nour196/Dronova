const nodemailer = require("nodemailer");

// إعدادات النقل (Mail Transporter)
const transporter = nodemailer.createTransport({
    service: 'gmail', // يمكنك تغيير هذا إلى خدمة البريد الإلكتروني التي تستخدمها
    auth: {
        user: 'drone.estin@gmail.com',  // بريدك الإلكتروني
        pass: 'kdfw sgla ifiu znhy'    // كلمة المرور الخاصة بالبريد الإلكتروني
    }
});

// إنشاء الكود
const resetCode = Math.floor(100000 + Math.random() * 900000);  // كود مكون من 6 أرقام
console.log(`The reset code is: ${resetCode}`);  // طباعة الكود في الكونسول

// إرسال الكود عبر البريد الإلكتروني
const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'hboulanouar08@gmail.com', // البريد الإلكتروني الذي سترسل إليه الكود
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${resetCode}`
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log('Error occurred:', error);
    } else {
        console.log('Email sent successfully:', info.response);
    }
});
