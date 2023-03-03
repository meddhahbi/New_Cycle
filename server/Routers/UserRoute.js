const route = require('express').Router();
const userModel = require('../Models/User');


route.get('/', (req,res,next)=>{
    userModel.testConnect().then((msg)=>res.send(msg)).catch((err)=>res.send(err))
})

module.exports = route;