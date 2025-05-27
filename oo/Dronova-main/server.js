require('dotenv').config();  // تأكد من استيراد dotenv في البداية

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authController = require('./controllers/authController');

// Initialize Express app first
const app = express();
// CORS middleware FIRST
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5177'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-auth-token'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Template engine setup
const templatePath = path.join(__dirname, "templates");
const publicPath = path.join(__dirname, "public");

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://droneuser:projetgroupe5@dronedb.momlvso.mongodb.net/dronova?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
        console.log("Database name:", mongoose.connection.name);
        console.log("Connection state:", mongoose.connection.readyState);
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// Import all routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const droneRoutes = require("./routes/droneRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Import admin routes

// Use API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/drones", droneRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes); // Use admin routes

// Auth routes
app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', authController.register);
app.post('/api/auth/google', authController.googleAuth);

// 404 Error handler
app.use((req, res) => {
    res.status(404).render("404", { message: "Page not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
