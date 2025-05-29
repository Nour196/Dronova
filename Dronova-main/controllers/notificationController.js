
const Notification = require('../models/Notification');

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const isAdmin = req.user.isAdmin;
    
    let query = { userId };
    if (isAdmin) {
      query = { $or: [{ userId }, { forAdmin: true }] };
    }
    
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 });
      
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Failed to update notification' });
  }
};
exports.getUserNotificationsByAdmin = async (req, res) => {
    try {
      
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      const userId = req.params.userId;
      const notifications = await Notification.find({ userId })
        .sort({ createdAt: -1 });
        
      res.json(notifications);
    } catch (error) {
      console.error('Error fetching user notifications:', error);
      res.status(500).json({ message: 'Failed to fetch notifications' });
    }
  };