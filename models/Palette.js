const mongoose = require('mongoose');

const paletteSchema = new mongoose.Schema({
  employee: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Palette = mongoose.model('Palette', paletteSchema);

module.exports = Palette;
