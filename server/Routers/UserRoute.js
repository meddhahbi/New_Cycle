const route = require('express').Router();
const userModel = require('../Models/User');
const {User} = require('../Models/User');
const path = require('path');
const { protect } = require("../middleware/authmiddleware");
const passport = require("passport");
const multer = require('multer');

const bcrypt = require('bcrypt');
const axios = require('axios');
const cheerio = require('cheerio');
const articles = require('../Models/Article')




// route.get('/', (req,res,next)=>{
//     userModel.testConnect().then((msg)=>res.send(msg)).catch((err)=>res.send(err))
// })



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // set the destination folder for uploaded files
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

route.put("/setOffline",protect ,async(req, res, next)=>{
    console.log("offline")
        await User.findByIdAndUpdate(req.body.userId, {isOnline:false})
            .then((user)=>res.status(200).json({
            user:user,
            msg:'User offlined successfully'
        }))
            .catch((err)=>res.status(400).json({error:err}))
    }
)




    route.post('/register',upload.single('image'),(req,res,next)=>{
  const image = req.file.path;
  // let img = image.split("uploads\\")[1]
    userModel.register(req.body.username,req.body.email,req.body.password,req.body.phone,req.body.postal,image,req.body.role)
    .then((user)=>res.status(200).json({
        user:user,
        msg:'User registered successfully'
    }))
    .catch((err)=>res.status(400).json({error:err}));
})


// app.get('/images/:filename', (req, res) => {
//   const { filename } = req.params;
//   const filePath = path.join(__dirname, 'uploads', filename);
//   res.sendFile(filePath);
// });

// route.get('/cleanFileName/:fileName',(req,res)=>{
//   const fileName= req.params.fileName;
//   const cleanFilename = fileName.replace("/uploads/", "");
//   console.log(cleanFilename); // Output: "myfile.jpg"
//   res.status(200).json({
    
//     msg:'Done'
// })
// });






route.get("/me/:mail", async (req, res, next)=>{
     userModel.currentUser(req.params.mail)
         .then((user)=>res.status(200).json({
        user:user,
        msg:'User'
    }))
    
    .catch((err)=>res.status(400).json({error:err}));
    // console.log(user.email);
    
})
route.get("/checkPass/:pass",protect, async (req, res, next)=>{

     bcrypt.compare(req.params.pass, req.user.password).then((same)=> {
             if (same) {
                 res.status(200).json({
                     msg: 'same pass'
                 })
             } else
                 res.status(200).json({error:"pass are not the same"});
         }
     )
         .catch((err)=>res.status(400).json({error:err}));

})
route.put("/updatePass",protect, async (req, res, next)=>{

    bcrypt.hash(req.body.newPass,10).then((password)=>{
        // console.log(password)
        // console.log(req.body.newPass)
        User.findByIdAndUpdate(req.user._id,{password:password}).then(user=>{
            res.status(200).send(user)

        })

    })
        .catch((err)=>res.status(400).json({error:err}))

     // bcrypt.compare(req.params.pass, req.user.password).then((same)=> {
     //         if (same) {
     //             res.status(200).json({
     //                 msg: 'same pass'
     //             })
     //         } else
     //             res.status(200).json({error:"pass are not the same"});
     //     }
     // )
     //    .catch((err)=>res.status(400).json({error:err}));

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


route.post('/subscribe/:email',(req,res,next)=>{
    userModel.createSubs(req.params.email)
    .then((user)=>res.status(200).json({
      user:user,
      msg:'User subscribed successfully'
  }))
  .catch((err)=>res.status(400).json({error:err}));
});


route.put('/block/:_id',(req,res,next)=>{
  console.log(req.body);
  userModel.block(req.params._id)
  .then(()=>res.status(200).json({
      msg:'User blocked successfully'
  }))

  .catch((err)=>res.status(400).json({msg:"User not found"}));

});


route.get('/verifySubs/:email',(req,res,next)=>{
  userModel.verifySubscription(req.params.email)
  .then((status)=>{
    if(status){
      res.status(200).json({
        subscribed:true
      })
    }else{
      res.status(200).json({
        subscribed:false
      })
     
    }
  }).catch((err)=>{
    res.status(400).json({
      error:err
    })
  })
});


route.get('/users',(req,res,next)=>{
  userModel.getAllUsers()
  .then((doc)=>res.status(200).json(doc))
  .catch((err)=>res.status(400).json(err))
});


route.get('/users/count',(req,res,next)=>{
  userModel.getAllUsersCount()
  .then((doc)=>res.status(200).json(doc))
  .catch((err)=>res.status(400).json(err))
})

// const storage = multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,'./publlic')
//   },
//   filename:(req,res,cb)=>{
//     const filename = `${Date.now()}_${file.originalname}`;
//     cb(null,filename);
//   }
// })
// const upload = multer({storage}).single('receipt');


route.get('/scrape', (req, res) => {
  return new Promise(async (resolve, reject) => { // Wrap the route handler in a Promise
    try {
      // Fetch HTML content
      const response = await axios.get('https://www.theguardian.com/uk');
      const $ = cheerio.load(response.data);

      // Extract data
      const articles = [];
      $('.js-headline-text').each((index, element) => {
        const title = $(element).text();
        const description = $(element).closest('.js-headline-text').text();
        const link = $(element).attr('href');
        const image = $(element).closest('.js-headline-text').find('.js-media-image img').attr('src'); // Fix image extraction
        // Add to articles array
        articles.push({ title, description, link , image});
      });

      // Resolve the Promise with the scraped data
      resolve({ message: 'Scraping completed!', articles });
    } catch (error) {
      // Reject the Promise with an error object
      reject({ error: 'Failed to scrape data' });
    }
  })
  .then(data => {
    // Send a successful response with the scraped data
    res.json(data);
  })
  .catch(error => {
    // Handle the error and send an appropriate response
    res.status(500).json(error);
  });
});

route.get('/latest', (req, res, next) => {
  articles.getLastThreeArticles()
    .then((articles) => res.status(200).json({ articles: articles }))
    .catch((err) => res.status(400).json({ error: err.message }));
});




module.exports = route;
