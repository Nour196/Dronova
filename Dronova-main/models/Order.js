const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    location: { 
        type: String, 
        required: true 
    },
    scheduledDate: { 
        type: Date, 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    serviceType: { 
        type: String,
        enum: ["agriculture", "security", "industry", "customise"], 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "completed"], 
        default: "pending" 
    },
    assignedDrone: { 
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
