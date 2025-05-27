const mongoose = require("mongoose");//// استدعاء مكتبة mongoose

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

const Drone = mongoose.model("Drone", droneSchema);//انشاء مخطط يعتمد على البيانات السابقة

module.exports = Drone;//التصدير للاستعمال في الملفات الاخرى