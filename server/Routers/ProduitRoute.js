const express = require('express');
const router = express.Router();
const products = require('../models/Produit');

// Create a product
router.post('/', (req, res, next) => {
    products.createProduct(req.body.price, req.body.category, req.body.name, req.body.description, req.body.imageCatalogue)
      .then((product) => res.status(200).json({
        product: product,
        message: 'Product created successfully'
      }))
      .catch((err) => {
        console.error(err);
        res.status(400).json({ message: 'Failed to create product' });
      });
});

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
    products.updateProduct(req.params.id, req.body.price, req.body.category, req.body.name, req.body.description, req.body.imageCatalogue)
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
    const id = req.params.id;
    products.getProductById(id)
      .then((product) => res.status(200).json({ product: product }))
      .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
