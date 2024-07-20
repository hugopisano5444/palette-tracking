require('dotenv').config();
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { expect } = require('chai');
const Employee = require('../models/Employee');
const employeesRouter = require('../routes/employees');
const { connectDB, closeDB } = require('./dbTestConfig');

const app = express();
app.use(express.json());
app.use('/employees', employeesRouter);

// Connect to the test database
before(async function () {
  this.timeout(10000); // Augmente le délai d'attente pour le hook before
  await connectDB();
});

// Clear the database before each test
beforeEach(async () => {
  await Employee.deleteMany({});
});

// Tests for the Employee routes
describe('GET /employees', () => {
  it('should get all employees', (done) => {
    request(app)
      .get('/employees')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /employees', () => {
  it('should create a new employee', (done) => {
    const employeeData = { name: 'John Doe', post: 1 };
    request(app)
      .post('/employees')
      .send(employeeData)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const { body } = response;
        expect(body).to.have.property('_id');
        expect(body.name).to.equal('John Doe');
        expect(body.post).to.equal(1);
        done();
      })
      .catch(done);
  });
});

// Close the connection after all tests are done
after(async function () {
  this.timeout(10000); // Augmente le délai d'attente pour le hook after
  await closeDB();
});
