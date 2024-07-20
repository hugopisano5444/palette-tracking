const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  post: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
