// controllers/adminController.js

// Import your existing models
const User = require('../models/User'); // Adjust based on your actual model names
const Drone = require('../models/Drone');
const Order = require('../models/Order');
const Report = require('../models/Report');
const jwt = require('jsonwebtoken');

// Admin login function - using User model with admin role
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user with admin role by email
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }
        
        // Check password - adjust based on your password comparison method
        const isMatch = await admin.comparePassword(password); // Modify if needed
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }
        
        // Generate token
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        
        res.status(200).json({
            success: true,
            message: "Admin login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Login failed", 
            error: error.message 
        });
    }
};

// Dashboard controller - Get admin dashboard data
const getDashboard = async (req, res) => {
    try {
        // Fetch counts of various entities for dashboard
        const userCount = await User.countDocuments();
        const droneCount = await Drone.countDocuments();
        const orderCount = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: 'pending' });

        res.status(200).json({
            success: true,
            data: {
                userCount,
                droneCount,
                orderCount,
                pendingOrders
            }
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching dashboard data", 
            error: error.message 
        });
    }
};

// User management functions
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching users", 
            error: error.message 
        });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const { userId, isActive } = req.body;
        const user = await User.findByIdAndUpdate(
            userId, 
            { isActive }, 
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            message: "User status updated successfully", 
            data: user 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error updating user status", 
            error: error.message 
        });
    }
};

// Drone management functions
const getAllDrones = async (req, res) => {
    try {
        const drones = await Drone.find();
        res.status(200).json({ success: true, data: drones });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching drones", 
            error: error.message 
        });
    }
};

const updateDroneStatus = async (req, res) => {
    try {
        const { droneId, status } = req.body;
        const drone = await Drone.findByIdAndUpdate(
            droneId, 
            { status }, 
            { new: true }
        );
        
        if (!drone) {
            return res.status(404).json({ 
                success: false, 
                message: "Drone not found" 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            message: "Drone status updated successfully", 
            data: drone 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error updating drone status", 
            error: error.message 
        });
    }
};

// Order management functions
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('drone', 'name model');
            
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching orders", 
            error: error.message 
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findByIdAndUpdate(
            orderId, 
            { status }, 
            { new: true }
        )
        .populate('user', 'name email')
        .populate('drone', 'name model');
        
        if (!order) {
            return res.status(404).json({ 
                success: false, 
                message: "Order not found" 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            message: "Order status updated successfully", 
            data: order 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error updating order status", 
            error: error.message 
        });
    }
};

// Report management functions
const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate('user', 'name email');
            
        res.status(200).json({ success: true, data: reports });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching reports", 
            error: error.message 
        });
    }
};

const resolveReport = async (req, res) => {
    try {
        const { reportId, resolution, status } = req.body;
        const report = await Report.findByIdAndUpdate(
            reportId, 
            { resolution, status, resolvedAt: Date.now() }, 
            { new: true }
        ).populate('user', 'name email');
        
        if (!report) {
            return res.status(404).json({ 
                success: false, 
                message: "Report not found" 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            message: "Report resolved successfully", 
            data: report 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error resolving report", 
            error: error.message 
        });
    }
};

// Export all controller functions
module.exports = {
    adminLogin,
    getDashboard,
    getAllUsers,
    updateUserStatus,
    getAllDrones,
    updateDroneStatus,
    getAllOrders,
    updateOrderStatus,
    getAllReports,
    resolveReport
};