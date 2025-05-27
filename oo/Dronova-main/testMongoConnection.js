const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://droneuser:projetgroupe5@dronedb.momlvso.mongodb.net/?retryWrites=true&w=majority&appName=DroneDB';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }); 