const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    location: { 
        type: Object, 
        required: true 
    }, // { lat, lng }
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
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Drone" 
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
