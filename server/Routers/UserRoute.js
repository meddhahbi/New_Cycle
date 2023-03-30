const route = require('express').Router();
const userModel = require('../Models/User');
const path = require('path');
const passport = require("passport");


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

route.get("/me/:mail", async (req, res, next)=>{
     userModel.currentUser(req.params.mail)
         .then((user)=>res.status(200).json({
        user:user,
        msg:'User'
    }))
    
    .catch((err)=>res.status(400).json({error:err}));
    // console.log(user.email);
    
})

route.put("/client/me/update/:mail",async(req, res, next)=>{
    userModel.updateProfile(req.params.mail, req.body.username, req.body.phone, req.body.postal)
        .then((user)=> {
            console.log("updated")
            res.status(200).json({
                user: user,
                msg: 'User Updated'
            })
        })

        .catch((err)=>res.status(400).json({error:err}));
    // console.log(user.email);

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

route.post('/resetPwd',(req,res,next)=>{
    userModel.resetPassword(req.body.email)
    .then((user)=>res.status(200).json({
        msg:'Email sent successfully'
    }))
    .catch((err)=>res.status(400).json({error:err}));
})  

route.put('/updatePassword/:_id',(req,res,next)=>{
    console.log(req.body);
    userModel.updatePassword(req.params._id, req.body.password)
    .then(()=>res.status(200).json({
        msg:'password updated successfully'
    }))
    .catch((err)=>res.status(400).json({error:err}));
});







//? Verified page route(static)
// route.get('/verified', (req,res)=>{
//     res.sendFile(path.join(__dirname,"./../Utils/verified.html"));
// })



route.post('/verifyuser/:activationCode',(req,res,next)=>{
    userModel.verifyUser(req.params.activationCode)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
});




route.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  route.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "http://localhost:3000/login",
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      console.log(req);
      res.redirect(
        `http://localhost:3000?email=${req.user.email}&fullname=${req.user.username}&secret=${req.user.secret}`
      );
    }
  );




  route.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["profile", "email"] })
  );
  
  route.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "http://localhost:3000/login",
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      console.log(req);
      res.redirect(
        `http://localhost:3000?email=${req.user.email}&fullname=${req.user.username}&secret=${req.user.secret}`
      );
    }
  );


route.post('/subscribe',(req,res,next)=>{
    userModel.createSubs(req.body.email)
    .then((user)=>res.status(200).json({
      user:user,
      msg:'User subscribed successfully'
  }))
  .catch((err)=>res.status(400).json({error:err}));
});



module.exports = route;
