const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Ajouter un Poste
router.post('/', async (req, res) => {
  const post = new Post(req.body);

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtenir Tous les Postes
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('employees');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mettre à Jour un Poste
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Poste non trouvé' });

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un Poste
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Poste non trouvé' });

    await post.remove();
    res.json({ message: 'Poste supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
