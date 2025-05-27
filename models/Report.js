const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reportData: { type: Object, required: true }, 
    createdAt: { type: Date, default: Date.now },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    droneId: { type: mongoose.Schema.Types.ObjectId, ref: "Drone", required: true },
    operatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
