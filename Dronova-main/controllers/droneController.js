const Drone = require("../models/Drone");

console.log("Loading droneController.js"); 

const createDrone = async (req, res) => { 
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Only admins can create drones" }); 
        }
        const { model, serialNumber, status, capabilities } = req.body; 
        const newDrone = new Drone({ model, serialNumber, status, capabilities }); 

        await newDrone.save();
        res.status(201).json({ message: "Drone created successfully", drone: newDrone });
    } catch (error) {
        res.status(500).json({ message: "Failed to create drone", error: error.message }); 
    }
};

const getAllDrones = async (req, res) => { 
    try {
        const drones = await Drone.find();
        res.status(200).json(drones); 
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch drones", error: error.message }); 
    }
};

const getDroneById = async (req, res) => { 
    try {
        const drone = await Drone.findById(req.params.id);
        if (!drone) return res.status(404).json({ message: "Drone not found" }); 

        res.status(200).json(drone);
    } catch (error) {
        res.status(500).json({ message: "Error fetching drone", error: error.message });
    }
};

const updateDrone = async (req, res) => { 
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Only admins can update drones" }); 
        }
        const updatedDrone = await Drone.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDrone) return res.status(404).json({ message: "Drone not found" }); 

        res.status(200).json({ message: "Drone updated successfully", drone: updatedDrone });
    } catch (error) {
        res.status(500).json({ message: "Failed to update drone", error: error.message });
    }
};

const deleteDrone = async (req, res) => { 
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access forbidden: Only admins can delete drones" }); 
        }
        const deletedDrone = await Drone.findByIdAndDelete(req.params.id);
        if (!deletedDrone) return res.status(404).json({ message: "Drone not found" }); 

        res.status(200).json({ message: "Drone deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete drone", error: error.message });
    }
};

module.exports = {
    createDrone,
    getAllDrones,
    getDroneById,
    updateDrone,
    deleteDrone
}; 


exports.completeMission = async (req, res) => {
    try {
      const mission = await Mission.findById(req.params.id);
      mission.status = 'completed';
      await mission.save();
      
      const order = await Order.findById(mission.orderId);
      
      await sendNotification({
        userId: order.userId,
        message: 'تم تنفيذ المهمة. تم إرسال النتائج إلى بريدك الإلكتروني.',
      });
      
      res.json(mission);
    } catch (error) {
      console.error('Failed to complete mission:', error);
      res.status(500).json({ message: 'Failed to complete mission' });
    }
  };