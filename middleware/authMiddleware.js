const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate user based on JWT token
const authenticate = async (req, res, next) => {
    try {
        // Get token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // For debugging

        // Find the user by ID from the token
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user to the request object
        req.user = user;
        console.log("Authenticated user:", req.user); // For debugging

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle invalid or expired token
        res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
};

// Middleware to authorize user based on roles
const authorize = (roles = []) => {
    return (req, res, next) => {
        // Ensure the user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Check if the user's role is allowed
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
        }

        next(); // Proceed if the user has the required role
    };
};

// Export the middleware functions
module.exports = { authenticate, authorize };
