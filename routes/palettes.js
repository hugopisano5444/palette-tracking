const express = require('express');
const router = express.Router();
const Palette = require('../models/Palette');

// Ajouter une Palette
router.post('/', async (req, res) => {
  const palette = new Palette(req.body);

  try {
    const newPalette = await palette.save();
    res.status(201).json(newPalette);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtenir Toutes les Palettes
router.get('/', async (req, res) => {
  try {
    const palettes = await Palette.find().populate('employee');
    res.json(palettes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mettre à Jour une Palette
router.put('/:id', async (req, res) => {
  try {
    const palette = await Palette.findById(req.params.id);
    if (!palette) return res.status(404).json({ message: 'Palette non trouvée' });

    Object.assign(palette, req.body);
    await palette.save();
    res.json(palette);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer une Palette
router.delete('/:id', async (req, res) => {
  try {
    const palette = await Palette.findById(req.params.id);
    if (!palette) return res.status(404).json({ message: 'Palette non trouvée' });

    await palette.remove();
    res.json({ message: 'Palette supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
