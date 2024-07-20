require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
