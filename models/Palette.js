const mongoose = require('mongoose');

const paletteSchema = new mongoose.Schema({
  woodType: {
    type: String,
    required: true,
    enum: ['chene', 'hetre', 'sapin']
  },
  size: {
    type: String,
    required: true,
    enum: ['33xl', '44xl']
  },
  count: {
    type: Number,
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  productionDate: {
    type: Date,
    default: Date.now
  }
});

const Palette = mongoose.model('Palette', paletteSchema);

module.exports = Palette;
