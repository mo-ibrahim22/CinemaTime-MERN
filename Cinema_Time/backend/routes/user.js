const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized Token NULL' });
  }
  jwt.verify(token.split(' ')[1], 'mySecret', (err, decodedToken) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ message: 'Unauthorized Verification Token' });
    }

    req.userId = decodedToken.userId;
    
    // Check if user is an admin
    User.findById(req.userId).then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Error Finding User' });
        }
        req.isAdmin = user.isAdmin; 
        next();
      })
      .catch(error => {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      });
  });
};

// Middleware to check if the provided email corresponds to the user associated with the token
const checkUserEmail = async (req, res, next) => {
  const { email } = req.params;
  const { userId } = req;

  try {
    const userToUpdate = await User.findOne({ email: email });

    if (!userToUpdate || userToUpdate._id.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized: You are not allowed to access this user\'s data' });
    }

    // If the email corresponds to the user associated with the token, move to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//tested
// User Registration
router.post('/register', async (req, res) => {
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

    const token = jwt.sign({ userId: newUser.id }, 'mySecret', { expiresIn: '90d' });
    res.status(201).json({ token ,message: 'User registered successfully' });
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//tested
// User Login
router.post('/login', async (req, res) => {
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
    const token = jwt.sign({ userId: user.id }, 'mySecret', { expiresIn: '90d' });
    res.status(201).json({ token });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//tested successfully 
// Get All Users
router.get('/', verifyToken, async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Forbidden Access' });
  }
  try {
    const users = await User.find();
    res.status(200).json({ message: 'Data retrieved successfully', users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//tested successfully
// Get User Info by Email
router.get('/:email', verifyToken, checkUserEmail, async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
// Update User by ID
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, password, old_password, gender } = req.body;
  const { userId } = req;

  try {
    // Find the user by ID
    const userToUpdate = await User.findById(id);

    // Verify if the user exists and matches the logged-in user
    if (!userToUpdate || userToUpdate._id.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized: You are not allowed to update this user\'s data' });
    }

    // Verify old password if provided
    if (old_password) {
      const passwordMatch = await bcrypt.compare(old_password, userToUpdate.password);
      if (!passwordMatch) {
        return res.status(403).json({ message: 'Old password does not match. Cannot update user.' });
      }
    }

    // Hash the new password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user information
    const updatedFields = { name, email, gender };
    if (hashedPassword) {
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(201).json({ message: 'User updated', updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//
// Delete User by ID [user - admin]
router.delete('/:id', verifyToken, checkUserEmail, async (req, res) => {
  
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
