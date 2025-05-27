const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate user based on JWT token
const authenticate = async (req, res, next) => {
    try {
        // Get token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('No Bearer token found in header');
            return res.status(401).json({ message: "Authentication required" });
        }

        // Extract the token from the header
        const token = authHeader.split(' ')[1];
        console.log("Received token:", token);

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        // Find the user by ID from the token
        const user = await User.findById(decoded.userId || decoded.id);
        if (!user) {
            console.log("User not found for ID:", decoded.userId || decoded.id);
            return res.status(401).json({ message: "User not found" });
        }

        // Log the user's role before attaching to request
        console.log("Found user with role:", user.role);

        // Attach user to the request object
        req.user = user;
        console.log("Authenticated user:", {
            id: user._id,
            email: user.email,
            role: user.role
        });

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ 
            message: "Invalid or expired token", 
            error: error.message 
        });
    }
};

// Middleware to authorize user based on roles
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            console.log('No user found in request during authorization');
            return res.status(401).json({ message: "Authentication required" });
        }

        console.log('Checking authorization for role:', req.user.role);
        console.log('Required roles:', roles);

        if (roles.length && !roles.includes(req.user.role)) {
            console.log('Authorization failed: User role not in allowed roles');
            return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
        }

        next();
    };
};

// Export the middleware functions
module.exports = { authenticate, authorize };
