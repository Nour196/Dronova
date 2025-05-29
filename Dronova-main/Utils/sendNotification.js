const Notification = require('../models/Notification');

async function sendNotification({ userId = null, message, forAdmin = false }) {
  try {
    const notification = new Notification({
      userId, 
      message,
      forAdmin,
    });
    return await notification.save();
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

module.exports = sendNotification;