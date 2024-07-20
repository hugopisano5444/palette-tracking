const express = require('express');
const router = express.Router();
const Palette = require('../models/Palette');

// Get all palettes
router.get('/', async (req, res) => {
  try {
    const palettes = await Palette.find().toArray();
    res.json(palettes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new palette
router.post('/', async (req, res) => {
  const palette = new Palette({
    employee: req.body.employee,
    count: req.body.count
  });

  try {
    const newPalette = await palette.save();
    res.status(201).json(newPalette);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
