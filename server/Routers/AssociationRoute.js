
const route = require('express').Router();
const associationModel = require('../Models/Association');
const path = require('path');



route.post('/register',(req,res,next)=>{
    associationModel.register(req.body.name,req.body.email,req.body.password,req.body.phone,req.body.postal,req.body.docVerif)
    .then((association)=>res.status(200).json({
        association:association,
        msg:'Association registered successfully'
    }))
    .catch((err)=>res.status(400).json({error:err}));
})