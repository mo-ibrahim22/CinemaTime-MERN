const item = require('../models/items.model.js');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const cloudinary = require('../middlewares/cloudinary'); 


const createNewItem = async (req, res) => {
  if (!req.isAdmin) {
      return res.status(403).json({ message: 'Forbidden Access' });
  }

  try {
      const { categorie, poster, rating, title, trailerLink, description, watchingLink } = req.body;

      // Upload image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(poster, {
          folder: 'items',
          resource_type: 'image' // Specify resource type as 'image' for image uploads
      });

      // Create new item with Cloudinary URL
      const newitem = new item({
          categorie,
          poster: uploadResult.secure_url, // Store Cloudinary URL
          rating,
          title,
          trailerLink,
          description,
          watchingLink
      });

      const savedItem = await newitem.save();
      res.status(201).json({ savedItem, message: 'item saved successfully' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};


// retreive all item with specific category   
const getAllItemsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
      // Fetch items from the database of ur category
      const items = await item.find({ categorie: category });

      // Map through the items and update the poster field to be the Cloudinary image URL
      const itemsWithCloudinaryURL = await Promise.all(items.map(async (item) => {
          // Fetch the Cloudinary URL for each item's poster
          const cloudinaryURL = await cloudinary.url(item.poster);

          // Return a new object with the Cloudinary URL replacing the base64 string
          return {
              ...item.toObject(),
              poster: cloudinaryURL
          };
      }));

      // Respond with the updated items
      res.json(itemsWithCloudinaryURL);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

 
// Retrieve a specific item by ID (front will use when user clicks on specific film it will display the film details)
const getItemById = async (req, res) => {
  const id = req.params.id;
  try {
    // Fetch the item from the database by ID
    const one_item = await item.findById(id);
    if (!one_item) {
      return res.status(404).json({ message: 'This item was not found' });
    }
    // Check if the poster is already a Cloudinary URL
    let poster = one_item.poster;
    if (!poster.startsWith('http')) {
      try {
        // Fetch the Cloudinary URL for the item's poster
        poster = await cloudinary.url(one_item.poster);
      } catch (cloudinaryError) {
        // Handle Cloudinary error
        return res.status(500).json({ message: 'Error fetching Cloudinary URL' });
      }
    }
    // Update the poster field to be the Cloudinary image URL
    const itemWithCloudinaryURL = {
      ...one_item.toObject(),
      poster: poster
    };
    // Respond with the updated item
    res.json(itemWithCloudinaryURL);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item from database' });
  }
};


/*
const getItemById = async (req, res) => {
  const id = req.params.id;
  try {
    const Item = await item.findById(id);
    if (!Item) {
      return res.status(404).json({ message: 'item not found' });
    }
  
    res.json({ Item ,message: 'item retrived successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/


const deleteItemById = async (req, res) => {
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
};


module.exports = {
  getAllItemsByCategory,
  getItemById,
  deleteItemById,
  createNewItem
};