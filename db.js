require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 30000,
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
