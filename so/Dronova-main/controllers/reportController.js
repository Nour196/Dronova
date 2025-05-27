const Report = require("../models/Report");
const Joi = require('joi');

console.log("Loading reportController.js"); 

const reportSchema = Joi.object({
    droneId: Joi.string().required(),
    issue: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    clientId: Joi.string().required(),
});

const createReport = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Admins only" });
        }

        const { error } = reportSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { droneId, issue, description, date, clientId } = req.body;
        const newReport = new Report({ droneId, issue, description, date, clientId });
        
        await newReport.save();
        res.status(201).json({ message: "Report created successfully", report: newReport });
    } catch (error) {
        res.status(500).json({ message: "Failed to create report", error: error.message });
    }
};

const getAllReports = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Admins only" });
        }

        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reports", error: error.message });
    }
};

const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: "Report not found" });
        
        if (req.user.role !== 'admin' && report.clientId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Access forbidden: Not authorized to view this report" });
        }

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: "Error fetching report", error: error.message });
    }
};

const updateReport = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Admins only" });
        }

        const { error } = reportSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReport) return res.status(404).json({ message: "Report not found" });
        res.status(200).json({ message: "Report updated successfully", report: updatedReport });
    } catch (error) {
        res.status(500).json({ message: "Failed to update report", error: error.message });
    }
};

const deleteReport = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Admins only" });
        }

        const deletedReport = await Report.findByIdAndDelete(req.params.id);
        if (!deletedReport) return res.status(404).json({ message: "Report not found" });
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete report", error: error.message });
    }
};

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport
};