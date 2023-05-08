const mongoose = require('mongoose');
const Product = require('../Models/Produit');

const Schema = mongoose.Schema;

const comparisonSchema = new Schema({
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  user:{
    type: Schema.Types.ObjectId,
    ref:"User"
  }
});

const Comparison = mongoose.model('Comparison', comparisonSchema);

const createComparison = async (req, res, next) => {
  try {
    const { products } = req.body;
    const comparison = new Comparison({ products });
    await comparison.save();
    const comparisonId = comparison._id.toString();
    res.cookie('comparisonId', comparisonId, { httpOnly: true });
    console.log('Comparison cookie set:', comparisonId);
    res.status(201).json(comparison);
  } catch (error) {
    next(error);
  }
};

const getComparison = async (req, res, next) => {
  try {
    const comparisonId = req.cookies.comparisonId;
    const comparison = await Comparison.findById(comparisonId).populate('products');
    const products = await Product.find({ _id: { $in: comparison.products } });
    res.status(200).json({ ...comparison.toObject(), products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Comparison,
  createComparison,
  getComparison,
};
module.exports = Comparison; 