const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

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
        const token = jwt.sign({ userId: user.id }, 'mySecret', { expiresIn: '1h' });
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

        console.log('newPassword:', newPassword);
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
