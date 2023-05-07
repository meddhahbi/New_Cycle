const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../Models/Produit');
const Comparison = require('../Models/comparaison');
const { protect } = require('../middleware/authmiddleware');

// Create comparison
router.post('/', protect, async (req, res, next) => {
  try {
    const { products } = req.body;
    const c = await Comparison.findOne({user:req.user._id}).then(async(comp)=>{
        console.log(comp)
        if(comp ){
            // if(comp.products)
            if (comp.products && comp.products.length>0 && comp.products.length<3){
                comp.products.push(products)
            }
            else(comp.products=products)
            console.log(comp)
             comp.save();
            res.status(201).send(comp);
            return comp
        }
        else{
    
            const comparison = new Comparison({products:products, user:req.user._id});
            await comparison.save();
            res.status(201).send(comparison);
            return comparison
        }
    })
    
    // const comparison = new Comparison();
    
    // const comparisonId = comparison._id.toString();
    // res.cookie('comparisonId', comparisonId, {
    //     maxAge: 1000 * 60 * 60 * 24, // cookie will expire in 1 day
    //     httpOnly: true, // cookie is accessible only through the HTTP protocol
    //     secure: true // cookie will only be sent over HTTPS
    //   });
    
    // console.log('Comparison cookie set:', comparisonId);
    
  } catch (error) {
    next(error);
  }
});

router.get("/my-comporators", protect, async(req, res, next)=>{
    try {
        const comparison = await Comparison.find({user:req.user._id})
        res.send(comparison)
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

// Get comparison
router.get('/comparison', async (req, res, next) => {
    try {
      const comparisonId = req.cookies.comparisonId;
      console.log("Comparison ID:", comparisonId);
      if (!comparisonId) {
        return res.status(404).json({ message: 'No comparison found.' });
      }
      const comparison = await Comparison.findById(comparisonId).populate('products');
      console.log("Comparison:", comparison);
      if (!comparison) {
        return res.status(404).json({ message: 'No comparison found.' });
      }
      const products = await Product.find({ _id: { $in: comparison.products } });
      console.log("Products:", products);
      res.status(200).json({ ...comparison.toObject(), products });
    } catch (error) {
      next(error);
  }
});
  
module.exports = router;