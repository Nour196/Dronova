const User = require('../models/User');
const Drone = require('../models/Drone');
const Report = require('../models/Report');

exports.getAdminDashboard = async (req, res) => {
  try {
    const customerCount = await User.countDocuments({ role: 'user' });
    
    
    const droneCount = await Drone.countDocuments();
    const reportCount = await Report.countDocuments();

    res.status(200).json({
      customers: customerCount,
      requests: {
        total: 0,
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      drones: droneCount,
      reports: reportCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dashboard data' });
  }
};
