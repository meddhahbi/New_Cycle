// <<<<<<< HEAD
const express = require('express');
const router = express.Router();
const products = require('../Models/Produit.js')
const {createProduct, AllProducts, updateProduit, deleteProduct, getProductById, Product} = require('../Models/Produit.js')
const multer = require('multer');
const Sentiment = require('sentiment');
var mlKnn = require('ml-knn');
const path = require('path');
const {protect} = require('../middleware/authmiddleware');
const FormData = require('form-data');
const axios = require('axios');


// Get 6 most recent posts
router.get('/prods_by_cat/:cat', protect,(req, res) => {

  Product.find({restingQuantity:{$ne:0}, category:req.params.cat})
      // .populate("association", "name")
      .then(posts=>{
        console.log(posts)
        res.send(posts)
      })
      .catch((err)=>{
        console.log(err)
        res.status(401)
      })
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname); // set the filename for uploaded files
  }
});

const fileFilter = function (req, file, cb) {
  // set the file filter for uploaded files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const trainModel = (products, category) => {
  const categoryProducts = products.filter((product) => product.category === category);
  const sentiment = new Sentiment();
  const X = categoryProducts.map((product) => {
    const { score } = sentiment.analyze(product.description);
    return [score];
  });
  const Y = categoryProducts.map((product) => product.price);
  const knn = new mlKnn(X, Y, {k: 5});
  return knn;
};

router.route('/').post(protect, upload.single('images'), async (req, res) => {
  console.log("req.user")
  const { name, description, price, category, stock, city, region, country, latitude, longitude } = req.body;
  const images = req.file.path;
  console.log(images)
  try {
    let product;
    if (price) {
      product = await createProduct(name, description, price, category, stock, images, country, city, region, latitude, longitude , req.user._id);
    } else {
      const allProducts = await Product.AllProducts();
      const knn = trainModel(allProducts, category);
      const sentiment = new Sentiment();
      const { score } = sentiment.analyze(description);
      const estimatedPrice = knn.predict([[score]]);
      product = await Product.createProduct(name, description, estimatedPrice[0], category, images,req.user._id);
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
    const allProducts = await AllProducts();
    const knn = trainModel(allProducts, category);
    const sentiment = new Sentiment();
    const { score } = sentiment.analyze(description);
    const estimatedPrice = knn.predict([[score]]);
    res.status(200).json({ estimatedPrice: estimatedPrice[0] });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to estimate price' });
  }
});

// module.exports = router;




// Delete a product
router.delete('/:id', (req, res) => {
  const productId = req.params.id;

  deleteProduct(productId)
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

router.put('/:id', upload.single('images'), (req, res, next) => {
  //const images = req.file.path;
  console.log("upd")
  updateProduit(req.params.id, req.body.name, req.body.description, req.body.price, req.body.category,{new:true})
      .then((product) => res.status(200).json({
        product: product,
        msg: 'Product updated successfully'
      }))
      .catch((err) => res.status(400).json({ error: err }));
});

router.get('/', (req, res, next) => {
  AllProducts()
      .then((products) => res.status(200).json({ products: products }))
      .catch((err) => res.status(400).json({ error: err }));
});





// Get all products
router.get('/all', (req, res, next) => {
  AllProducts()
      .then((products) => res.status(200).json({ products: products }))
      .catch((err) => res.status(400).json({ error: err }));
});

// Get a product by ID
router.get('/:id', (req, res, next) => {
  const productId = req.params.id;

  getProductById(productId)
      .then((product) => res.status(200).json({ product: product }))
      .catch((err) => res.status(400).json({ error: err }));
});

// var apiKey = process.env.OPENAI_SECRET_KEY;


// router.post('/generate-image', async (req, res) => {
//   const { description } = req.body;
//   const form = new FormData();
//   form.append('model', 'image-alpha-001');
//   form.append('prompt', description);
//   const response = await axios.post('https://api.openai.com/v1/images/generations', form, {
//     headers: {
//       'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
//       Authorization: `Bearer ${apiKey}`,
//     },
//   });
//   res.send(response.data.data[0].url);
// });






module.exports = router;
