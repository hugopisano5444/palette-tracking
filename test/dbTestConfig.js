require('dotenv').config();
const mongoose = require('mongoose');

let isConnected;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
    });
    isConnected = true;
    console.log('Connected to MongoDB for testing');
  } catch (err) {
    console.error('connection error:', err);
    throw err;
  }
};

const closeDB = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('error closing connection:', err);
    throw err;
  }
};

module.exports = { connectDB, closeDB };
