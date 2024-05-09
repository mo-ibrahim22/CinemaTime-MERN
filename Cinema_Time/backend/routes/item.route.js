const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const itemController = require('../controllers/item.controller');


router.get('/:category', verifyToken, itemController.getAllItemsByCategory);
router.get('/:id', verifyToken, itemController.getItemById);
router.delete('/:id', verifyToken, itemController.deleteItemById);

// add new item Admin access
router.post('/', verifyToken, itemController.createNewItem);
module.exports = router;
