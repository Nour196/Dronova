
const express = require('express');
const router = express.Router();
const { getUserNotifications, markAsRead, getUserNotificationsByAdmin  } = require('../controllers/notificationController');
const auth = require('../middleware/auth'); 

router.get('/', auth, getUserNotifications);
router.put('/:id/read', auth, markAsRead);
router.get('/user/:userId', auth, getUserNotificationsByAdmin);

module.exports = router;


router.get('/user/:userId', auth, async (req, res) => {
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
  });