const mongoose = require("mongoose");
const { MONGO_URI } = require("../constant/env.constant");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected (Product Service)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
