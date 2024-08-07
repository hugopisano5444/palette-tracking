require('dotenv').config();
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { expect } = require('chai');
const Palette = require('../models/Palette');
const Employee = require('../models/Employee');
const palettesRouter = require('../routes/palettes');
const employeesRouter = require('../routes/employees');
const { connectDB, closeDB } = require('./dbTestConfig');

const app = express();
app.use(express.json());
app.use('/palettes', palettesRouter);
app.use('/employees', employeesRouter);

// Connect to the test database
before(async function () {
  this.timeout(10000); // Augmente le délai d'attente pour le hook before
  await connectDB();
});

// Clear the database before each test
beforeEach(async () => {
  await Palette.deleteMany({});
  await Employee.deleteMany({});
});

// Tests for the Palette routes
describe('GET /palettes', () => {
  it('should get all palettes', (done) => {
    request(app)
      .get('/palettes')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /palettes', () => {
  it('should create a new palette', async () => {
    const employee = new Employee({ name: 'John Doe', post: 1 });
    await employee.save();

    const paletteData = {
      woodType: 'chene',
      size: '33xl',
      count: 10,
      employee: employee._id,
    };

    await request(app)
      .post('/palettes')
      .send(paletteData)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const { body } = response;
        expect(body).to.have.property('_id');
        expect(body.woodType).to.equal('chene');
        expect(body.size).to.equal('33xl');
        expect(body.count).to.equal(10);
        expect(body.employee).to.equal(employee._id.toString());
      });
  });
});

// Close the connection after all tests are done
after(async function () {
  this.timeout(10000); // Augmente le délai d'attente pour le hook after
  await closeDB();
});
