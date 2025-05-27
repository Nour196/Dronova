const mongoose = require("mongoose");

const droneSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['available', 'maintenance', 'deployed'],
        default: 'available'
    },
    capabilities: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Drone = mongoose.model("Drone", droneSchema);
module.exports = Drone;