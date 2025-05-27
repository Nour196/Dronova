// createAdmin.js
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
    createAdmin();
}).catch(err => {
    console.error('Error connecting to database:', err);
});

async function createAdmin() {
    try {
        // التحقق مما إذا كان الأدمين موجود بالفعل
        const adminExists = await User.findOne({ email: 'admin@dronova.com' });
        
        if (adminExists) {
            console.log('Admin already exists');
            mongoose.connection.close();
            return;
        }
        
        // إنشاء حساب أدمين جديد
        const admin = new User({
            name: 'Admin',
            email: 'drone.estin@gmail.com',
            phone: '123456789',
            password: 'AdminSecurePassword123',
            confirmPassword: 'AdminSecurePassword123',
            role: 'admin'
        });
        
        await admin.save();
        console.log('Admin created successfully');
        
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        mongoose.connection.close();
    }
}