const express = require('express');
const router = express.Router();
const wishlistController = require('../Models/wishlist');

router.post('/', async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const result = await wishlistController.addToWishlist(productId, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const wishlist = await wishlistController.getWishlist(userId);
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving wishlist' });
  }
});


module.exports = router;
