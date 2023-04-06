const express = require('express');
const router = express.Router();
const products = require('../models/Produit');
const multer = require('multer');
var mlKnn = require('ml-knn');



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/upload/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

//const { KNN } = require('ml-knn');

const trainModel = (products) => {
  const X = products.map((product) => [product.description.length, product.category.length]);
  const Y = products.map((product) => product.price);
  const knn = new mlKnn(X, Y, {k: 5});
  return knn;
};


router.post('/', upload.array('images', 10), async (req, res) => {
  const { name, description, price, category } = req.body;

  const images = req.files.map(file => `public/upload/${file.filename}`);

  try {
    let product;
    if (price) {
      product = await products.createProduct(name, description, price, category, images);
    } else {
      const allProducts = await products.AllProducts();
      const knn = trainModel(allProducts);
      const estimatedPrice = knn.predict([[description.length, category.length]]);
      product = await products.createProduct(name, description, estimatedPrice[0], category, images);
    }

    res.status(200).json({
      product: product,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create product' });
  }
});

router.get('/estimate', async (req, res) => {
  try {
    const { description, category } = req.query;
    const allProducts = await products.AllProducts();
    const knn = trainModel(allProducts);
    const estimatedPrice = knn.predict([[description.length, category.length]]);
    res.status(200).json({ estimatedPrice: estimatedPrice[0] });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to estimate price' });
  }
});

module.exports = router;





// Delete a product
router.delete('/:id', (req, res) => {
  const productId = req.params.id;

  products.deleteProduct(productId)
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Failed to delete product',
        error: err.message
      });
    });
});

// Update a product
router.put('/:id',(req,res,next)=>{
  const productId = req.params.id;
  const { name, description, price, category, imageCatalogue } = req.body;

  products.updateProduct(productId, price, category, name, description, imageCatalogue)
  .then((product)=>res.status(200).json({
      product:product,
      msg:'Product updated successfully'
  }))
  .catch((err)=>res.status(400).json({error:err}));
});

// Get all products
router.get('/all', (req, res, next) => {
  products.AllProducts()
    .then((products) => res.status(200).json({ products: products }))
    .catch((err) => res.status(400).json({ error: err }));
});

// Get a product by ID
router.get('/:id', (req, res, next) => {
  const productId = req.params.id;
  
  products.getProductById(productId)
    .then((product) => res.status(200).json({ product: product }))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
