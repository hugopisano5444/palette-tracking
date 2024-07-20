const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const palettesRouter = require('../routes/palettes');
const Palette = require('../models/Palette');

// Connect to the test database
before((done) => {
  mongoose.connect('mongodb+srv://hugopisano:5rYtcpLZm8Cnp9jV@cluster0.kc8xrga.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
    serverSelectionTimeoutMS: 30000
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB for testing');
    done();
  });
});

// Use the palettes router
app.use(express.json());
app.use('/palettes', palettesRouter);

// Tests for the GET /palettes route
describe('GET /palettes', () => {
  it('should get all palettes', (done) => {
    request(app)
      .get('/palettes')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// Tests for the POST /palettes route
describe('POST /palettes', () => {
  it('should create a new palette', (done) => {
    const palette = { employee: 'John Doe', count: 10 };
    request(app)
      .post('/palettes')
      .send(palette)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

// Close the connection after tests are done
after((done) => {
  console.log('Closing MongoDB connection...');
  mongoose.disconnect()
    .then(() => {
      console.log('MongoDB connection closed.');
      done();
    })
    .catch((err) => {
      console.error('Error closing MongoDB connection:', err);
      done(err);
    });
});
