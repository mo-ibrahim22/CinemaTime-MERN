const express = require('express');
const router = express.Router();
const item = require('../models/items.model.js');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js'); // Import User model for admin verification


// Middleware for verifying JWT token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(token, 'secret');
    req.userId = decodedToken.userId;

    // Check if user is an admin
    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden Access' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// GET all items by category
router.get('/item/:category', verifyToken, async (req, res) => {
  const category = req.params.category;
  try {
    const items = await item.find({ categorie: category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET specific item by ID    ==> front will use when open details of item
router.get('/item/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const one_item = await item.findById(id); // Changed from Movie.findById(id)
    if (!one_item) {
      return res.status(404).json({ message: 'this item not found' });
    }
    res.json(one_item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// DELETE item by ID  [Admin]
router.delete('/item/:id', verifyToken, async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Forbidden Access' });
  }
  const id = req.params.id;
  try {
    const deletedItem = await item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'item not found' });
    }

    res.json({ message: 'item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new item [Admin]
router.post('/item', verifyToken, async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Forbidden Access' });
  }
  const { id, categorie, poster, rating, title, trailerLink, description, watchingLink } = req.body;
  try {
    const newitem = new item({
      id,
      categorie,
      poster,
      rating,
      title,
      trailerLink,
      description,
      watchingLink
    });
    const savedItem = await newitem.save();
    res.status(201).json(savedItem, { 'message': 'item saved successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
