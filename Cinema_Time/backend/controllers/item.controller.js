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
    // Fetch items from the database of your category
    const items = await item.find({ categorie: category });

    // Fetch the user ID from the token
    const userId = req.userId;

    // Retrieve the user's favorites
    const user = await User.findById(userId);
    const userFavorites = user ? user.Favourites : [];

    // Map through the items and update them to include whether they are in the user's favorites
    const itemsWithFavoriteInfo = await Promise.all(items.map(async (item) => {
      // Fetch the Cloudinary URL for each item's poster
      const cloudinaryURL = await cloudinary.url(item.poster);

      // Check if the item is in the user's favorites
      const isFavorite = userFavorites.includes(item._id.toString());

      // Return a new object with the Cloudinary URL and favorite information
      return {
        ...item.toObject(),
        poster: cloudinaryURL,
        isFavorite
      };
    }));

    // Respond with the updated items
    res.json(itemsWithFavoriteInfo);
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



// Update item by ID
const updateItemById = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Forbidden Access' });
  }

  const id = req.params.id;
  const { categorie, poster, rating, title, trailerLink, description, watchingLink } = req.body;

  try {
    // Check if the item exists
    const existingItem = await item.findById(id);
    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Upload new image to Cloudinary if a new image is provided
    let updatedPoster = existingItem.poster;
    if (poster) {
      const uploadResult = await cloudinary.uploader.upload(poster, {
        folder: 'items',
        resource_type: 'image'
      });
      updatedPoster = uploadResult.secure_url;
    }

    // Update item fields
    existingItem.categorie = categorie;
    existingItem.poster = updatedPoster;
    existingItem.rating = rating;
    existingItem.title = title;
    existingItem.trailerLink = trailerLink;
    existingItem.description = description;
    existingItem.watchingLink = watchingLink;

    // Save the updated item
    const updatedItem = await existingItem.save();

    res.json({ updatedItem, message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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


//count all items 

const countallItems = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Forbidden Access' });
  }

  try {
    const moviesCount = await item.countDocuments({ categorie: 'Movies' });
    const tvShowsCount = await item.countDocuments({ categorie: 'TvShows' });
    const animeCount = await item.countDocuments({ categorie: 'Anime' });
    const totalCount = moviesCount + tvShowsCount + animeCount;

    const response = {
      Movies: moviesCount || 0, // If moviesCount is falsy (like 0 or undefined), default to 0
      TvShows: tvShowsCount || 0, // If tvShowsCount is falsy (like 0 or undefined), default to 0
      Anime: animeCount || 0, // If animeCount is falsy (like 0 or undefined), default to 0
      Total: totalCount
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  getAllItemsByCategory,
  getItemById,
  deleteItemById,
  createNewItem,
  updateItemById,
  countallItems
};