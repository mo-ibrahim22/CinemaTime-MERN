const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


// Middleware for verifying JWT token
exports.verifyToken = (req, res, next) => {
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
exports.checkUserEmail = async (req, res, next) => {
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
