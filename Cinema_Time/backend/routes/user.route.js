const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, checkUserEmail } = require('../middlewares/auth.middleware');
const mongoose = require('mongoose')

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);

// Get All Users
router.get('/', verifyToken, userController.getAllUsers);

// Get User Info by Email
router.get('/:email', verifyToken, checkUserEmail, userController.getUserByEmail);

// Update User by ID
router.put('/:id', verifyToken, userController.updateUser);

// Delete User by ID
router.delete('/:id', verifyToken, userController.deleteUser);


// Add to Favorites
router.post('/:userId/favorites/:itemId', verifyToken, userController.addToFavorites);


// Retrieve All Favorites
router.get('/:userId/favorites', verifyToken, userController.getAllFavorites);

// Delete from Favorites
router.delete('/:userId/myfavorites/:itemId', verifyToken, userController.deleteFromFavorites);


module.exports = router;
