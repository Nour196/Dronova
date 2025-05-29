const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

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
        const adminExists = await User.findOne({ email: proces.env.ADMIN_EMAIL });
        
        if (adminExists) {
            console.log('Admin already exists');
            mongoose.connection.close();
            return;
        }
        
        const admin = new User({
            name: 'Admin',
            email:process.env.ADMIN_EMAIL,
            phone: '123456789',
            password: process.env.ADMIN_PASS,
            confirmPassword: process.env.ADMIN_PASS,
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