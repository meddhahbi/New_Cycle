const mongoose = require('mongoose');
const Product = require('../Models/Produit'); // import the Product model
const User = require('../Models/User'); // import the User model

const wishlistSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

const addToWishlist = async (productId, userId) => {
  try {
    const product = await Product.getProductById(productId);
    const user = await User.getUserById(userId);

    if (!product) throw new Error('Product not found');
    if (!user) throw new Error('User not found');

    const wishlistItem = new Wishlist({
      product: product._id,
      user: user._id,
    });

    await wishlistItem.save();

    user.wishlist.push(wishlistItem._id);
    await user.save();

    return { message: 'Product added to wishlist' };
  } catch (error) {
    throw error;
  }
};

const getWishlist = async (userId) => {
  try {
    const user = await User.getUserById(userId);
    const wishlistIds = user.wishlist;
    const wishlistItems = await Wishlist.find({ _id: { $in: wishlistIds } })
      .populate('product') // add this line to populate the 'product' field
      .exec();
    const wishlist = wishlistItems.map((item) => {
      const product = item.product; // use the populated product field
      return { ...product.toObject(), user: item.user }; // spread the product fields and add the 'user' field
    });
    return wishlist;
  } catch (error) {
    throw error;
  }
};



deleteFavoris = (id) =>{
  return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        Wishlist.findByIdAndDelete(id)
          .then(() => {
         //     mongoose.disconnect();
              resolve();
          })
          .catch((err) => {
       //       mongoose.disconnect();
              reject({ message: "Failed to delete user from database", error: err });
          });
      })
      .catch((err) => {
      //    mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
      });
  });
}


module.exports = {
  addToWishlist,
  getWishlist,
  deleteFavoris,
};
