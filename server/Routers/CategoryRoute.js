const route = require('express').Router();
const {Category} = require('../Models/Category');
route.post('/',(req,res,next)=>{
    Category.create({name:req.body.name, description:req.body.description})
        .then((cat)=>res.status(200).send(cat))
        .catch((err)=>res.status(400).json({error:err}));
})
route.get('/',(req,res,next)=>{
    Category.find()
        .then((cat)=>res.status(200).json(cat))
        .catch((err)=>res.status(400).json({error:err}));
})

module.exports = route;
