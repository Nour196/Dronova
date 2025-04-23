require('dotenv').config();  // تأكد من استيراد dotenv في البداية

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Initialize Express app first
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Template engine setup
const templatePath = path.join(__dirname, "templates");
const publicPath = path.join(__dirname, "public");

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));

// Validate environment variables
if (!process.env.MONGO_URI || !process.env.PORT) {
    console.error("❌ Missing environment variables (MONGO_URI or PORT)");
    process.exit(1);
}

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        authSource: 'droneDB' // Authentication source
    })
    .then(() => console.log("✅ Connected to MongoDB"))
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

// 404 Error handler
app.use((req, res) => {
    res.status(404).render("404", { message: "Page not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
