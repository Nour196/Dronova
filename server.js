require('dotenv').config();  // استيراد المتغيرات البيئية

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors'); // ✅ استيراد CORS في الأعلى

// Initialize Express app first
const app = express();

app.use(cors({
  origin: 'http://localhost:5000', 
  credentials: true, 
}));

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
        authSource: 'admin' // Authentication source
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
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboard"); //  استيراد مسار dashboard

// Use API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/drones", droneRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes); //  ربط مسار dashboard

// 404 Error handler
app.use((req, res) => {
    res.status(404).render("404", { message: "Page not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



