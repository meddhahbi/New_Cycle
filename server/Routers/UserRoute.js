const route = require('express').Router();
const userModel = require('../Models/User');
const path = require('path');


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
    console.log("login")
    userModel.login(req.body.email,req.body.password)
    .then((token)=>{res.status(200).json({
        token:token
    })
    console.log(token)})
    .catch((err)=>{res.status(400).json({error:err});console.log(err)});
})



// route.get('/verify/:userId/:uniqueString',(req,res,next)=>{
//     userModel.verify(req.params.userId,req.params.uniqueString)
//     .then((user)=>res.status(200).json({
//         user:user,
//         msg:'User Verification successfully'
//     }))
//     .catch((err)=>res.status(400).json({error:err}));
// })





//? Verified page route(static)
// route.get('/verified', (req,res)=>{
//     res.sendFile(path.join(__dirname,"./../Utils/verified.html"));
// })



route.post('/verifyuser/:activationCode',(req,res,next)=>{
    userModel.verifyUser(req.params.activationCode)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
});




// route.delete('/logout',(req,res,next)=>{
//     userModel.logout(req.body.token)
//     .then((res)=>res.status(200).json({
//         msg:'Logout success'
//     }))
//     .catch((err)=>res.status(400).json({error:err}));
// })





module.exports = route;