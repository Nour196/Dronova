const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Not required for admin notifications
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  forAdmin: {
    type: Boolean,
    default: false // true if it's for admin
  }
});
module.exports = mongoose.model('Notification', notificationSchema);