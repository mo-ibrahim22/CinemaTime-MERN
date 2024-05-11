const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth.middleware');
const itemController = require('../controllers/item.controller');


router.get('/:category', verifyToken, itemController.getAllItemsByCategory);

router.get('/oneitem/:id', verifyToken, itemController.getItemById);

router.delete('/:id', verifyToken, itemController.deleteItemById);

router.put('/:id', verifyToken, itemController.updateItemById);


// add new item Admin access
router.post('/', verifyToken, itemController.createNewItem);

//count all items
router.get('/', verifyToken, itemController.countallItems);

module.exports = router;
