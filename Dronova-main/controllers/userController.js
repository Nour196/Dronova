const User = require("../models/User");


const createUser = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const newUser = new User({ name, email, phone, password, role });
        await newUser.save();

        
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({ message: "User created successfully", user: userResponse });
    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
};


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};


const updateUser = async (req, res) => {
    try {
        
        if (req.body.email) {
            const existingUser = await User.findOne({ 
                email: req.body.email,
                _id: { $ne: req.params.id }
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


const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
};



const signup = (req, res) => {
    res.status(201).json({ message: "User signed up successfully" });
};


const signin = (req, res) => {
    res.status(200).json({ message: "User signed in successfully" });
};


const updateAllUsersToCustomer = async (req, res) => {
    try {
        
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

