const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, checkUserEmail } = require('../middlewares/auth.middleware');

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

//add to favourite 


//retrive all favourites 


// delete from favourite 
module.exports = router;
