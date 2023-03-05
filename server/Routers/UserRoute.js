const route = require('express').Router();
const userModel = require('../Models/User');


// route.get('/', (req,res,next)=>{
//     userModel.testConnect().then((msg)=>res.send(msg)).catch((err)=>res.send(err))
// })

route.post('/register',(req,res,next)=>{
    userModel.register(req.body.username,req.body.email,req.body.password,req.body.phone,req.body.postal,req.body.role)
    .then((user)=>res.status(200).json({
        user:user,
        msg:'User registered successfully'
    }))
    .catch((err)=>res.status(400).json({error:err}));
})


route.post('/login',(req,res,next)=>{
    userModel.login(req.body.email,req.body.password)
    .then((token)=>res.status(200).json({
        token:token
    }))
    .catch((err)=>res.status(400).json({error:err}));
})


// route.delete('/logout',(req,res,next)=>{
//     userModel.logout(req.body.token)
//     .then((res)=>res.status(200).json({
//         msg:'Logout success'
//     }))
//     .catch((err)=>res.status(400).json({error:err}));
// })





module.exports = route;