const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, 'mySecret', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.userId = decodedToken.userId;
      
      // Check if user is an admin
      User.findById(req.userId, (err, user) => {
        if (err || !user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        req.isAdmin = user.isAdmin; 
        next();
      });
    });
  };

// User Registration
router.post('/users/register', async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    // Check if user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, gender });
    await newUser.save(); // save in database

    const token = jwt.sign({ userId: newUser.id }, 'mySecret', { expiresIn: '1h' });
    res.status(201).json({ token ,message: 'User registered successfully' });
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User Login
router.post('/users/login', async (req, res) => {
  

  const { email, password } = req.body;

  try {
    // Check if user with the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email User not found' });
    }
    // Check if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid password for the User' });
    }
    // Generate and return JWT token after logined successfully
    const token = jwt.sign({ userId: user.id }, 'mySecret', { expiresIn: '1h' });
    res.status(201).json({ token });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Users
router.get('/users', verifyToken, async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Forbidden Access' });
  }
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User by ID
router.put('/users/:id', verifyToken ,async (req, res) => {
  
  const { id } = req.params;
  const { name, email, password, gender } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password, gender }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(201).json(updatedUser , { message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete User by ID [user - admin]
router.delete('/users/:id', verifyToken, async (req, res) => {
  
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error   });
  }
});

module.exports = router;
