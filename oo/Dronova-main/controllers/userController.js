const User = require("../models/User");

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Check if user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const newUser = new User({ name, email, phone, password, role });
        await newUser.save();

        // Don't return the password in the response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({ message: "User created successfully", user: userResponse });
    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        // Don't return passwords when fetching users
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        // If trying to change email, check if it already exists
        if (req.body.email) {
            const existingUser = await User.findOne({ 
                email: req.body.email,
                _id: { $ne: req.params.id } // exclude current user
            });

            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
};

// Signup user
const signup = (req, res) => {
    res.status(201).json({ message: "User signed up successfully" });
};

// Signin user
const signin = (req, res) => {
    res.status(200).json({ message: "User signed in successfully" });
};

// Update all existing users to have 'customer' role
const updateAllUsersToCustomer = async (req, res) => {
    try {
        // Update all users except admin to have 'customer' role
        const result = await User.updateMany(
            { email: { $ne: 'sohaibmekersi1@gmail.com' } },
            { $set: { role: 'customer' } }
        );

        res.status(200).json({
            message: "Successfully updated user roles",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update user roles",
            error: error.message
        });
    }
};

// Final export
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    signup,
    signin,
    updateAllUsersToCustomer
};

