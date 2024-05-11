const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Item = require('../models/items.model');
const mongoose = require('mongoose');

// User Registration
exports.registerUser = async (req, res) => {
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
        res.status(201).json({ token, message: 'User registered successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User Login
exports.loginUser = async (req, res) => {
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
        // Generate and return JWT token after logged in successfully
        const token = jwt.sign({ userId: user.id }, 'mySecret', { expiresIn: '100d' });
        if ( user.isAdmin !== undefined) {
            res.status(201).json({ token, isAdmin: user.isAdmin });
        } else {
            res.status(500).json({ message: 'Error: User data is incomplete' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).json({ message: 'Forbidden Access' });
    }
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Data retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Info by Email
exports.getUserByEmail = async (req, res) => {
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
};

// Update User by ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, oldPassword, newPassword, gender } = req.body;
    const { userId } = req;

    try {
        // Find the user by ID
        const userToUpdate = await User.findById(id);

        // Verify if the user exists and matches the logged-in user
        if (!userToUpdate || userToUpdate._id.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You are not allowed to update this user\'s data' });
        }

        // Verify old password if provided
        if (oldPassword) {
            const passwordMatch = await bcrypt.compare(oldPassword, userToUpdate.password);
            if (!passwordMatch) {
                return res.status(403).json({ message: 'Old password does not match. Cannot update user.' });
            }
        } else {
            return res.status(400).json({ message: 'Old password is required to update user.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update user information
        const updatedFields = { name, email, password: hashedPassword, gender };

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
};

// Delete User by ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const { oldPassword } = req.body;

    try {
        // Find the user by ID
        const userToDelete = await User.findById(id);

        // Verify if the user exists and matches the logged-in user
        if (!userToDelete || userToDelete._id.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized: You are not allowed to delete this user' });
        }

        // Verify old password if provided
        if (oldPassword) {
            const passwordMatch = await bcrypt.compare(oldPassword, userToDelete.password);
            if (!passwordMatch) {
                return res.status(403).json({ message: 'Old password does not match. Cannot delete user.' });
            }
        } else {
            return res.status(400).json({ message: 'Old password is required to delete user.' });
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add to Favorites
exports.addToFavorites = async (req, res) => {
    try {
        // Extract userId and itemId from request parameters
        const userId = req.params.userId;
        const itemId = req.params.itemId;

        // Validate userId format
        const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
        if (!isValidUserId) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //Check if item exists (You may need to import your Item model)
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Initialize Favourites array if not already initialized
        if (!user.Favourites) {
            user.Favourites = [];
        }

        // Add item to favorites
        user.Favourites.push(itemId);
        await user.save();

        res.json({ message: 'Item added to favorites successfully' });
    } catch (error) {
        console.error('Error adding item to favorites:', error);
        res.status(500).json({ message: 'Error adding item to favorites' });
    }
};
  // Retrieve All Favorites
  exports.getAllFavorites = async (req, res) => {
    try {
        const userId = req.params.userId;
      
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        // Retrieve favorite items
        const favoriteItems = await Item.find({ _id: { $in: user.Favourites } });
  
        res.status(201).json(favoriteItems);
    } catch (error) {
        console.error('Error retrieving favorite items:', error);
        res.status(500).json({ message: 'Error retrieving favorite items' });
    }
};

 // Delete from Favorites
exports.deleteFromFavorites = async (req, res) => {
    try {
        const userId = req.params.userId;
        const itemId = req.params.itemId;

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if item exists in favorites
        const itemIndex = user.Favourites.findIndex(fav => fav.equals(itemId));
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in favorites' });
        }

        // Remove item from favorites
        user.Favourites.splice(itemIndex, 1);
        await user.save();

        res.json({ message: 'Item removed from favorites successfully' });
    } catch (error) {
        console.error('Error removing item from favorites:', error);
        res.status(500).json({ message: 'Error removing item from favorites' });
    }
};