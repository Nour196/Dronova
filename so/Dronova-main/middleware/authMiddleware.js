const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('No Bearer token found in header');
            return res.status(401).json({ message: "Authentication required" });
        }
        
        const token = authHeader.split(' ')[1];
        console.log("Received token:", token);
        
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        
        
        const user = await User.findById(decoded.userId || decoded.id);
        if (!user) {
            console.log("User not found for ID:", decoded.userId || decoded.id);
            return res.status(401).json({ message: "User not found" });
        }

        
        console.log("Found user with role:", user.role);

        
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


module.exports = { authenticate, authorize };
