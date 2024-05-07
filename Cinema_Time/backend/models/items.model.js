const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  categorie: {
    type: String, // Anime , movie , tv shows
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  trailerLink: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  watchingLink: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Add createdAt and updatedAt timestamps
});

const item = mongoose.model('item', itemSchema);

module.exports = item;