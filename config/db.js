const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // إيقاف السيرفر إذا فشل الاتصال
    }
};
console.log(`🔗 Connecting to: ${process.env.MONGO_URI}`);

module.exports = connectDB;
