const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postNumber: {
    type: Number,
    required: true,
    unique: true
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    }
  ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
