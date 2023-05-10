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


router.delete('/delete/:id', (req, res) => {
  const favorisId = req.params.id;

  wishlistController.deleteFavoris(favorisId)
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Favoris deleted successfully'
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Failed to delete favoris',
          error: err.message
        });
      });
});



module.exports = router;
