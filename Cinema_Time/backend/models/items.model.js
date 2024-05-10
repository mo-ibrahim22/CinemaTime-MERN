const mongoose = require('mongoose');
const { Timestamp } = require('mongodb')

const itemSchema = new mongoose.Schema({
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
}, { Timestamp: true })

const item = mongoose.model('item', itemSchema);

module.exports = item;