const route = require('express').Router();
const userModel = require('../Models/User');
const path = require('path');
const passport = require("passport");
const multer = require('multer');
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




route.post('/register',upload.single('image'),(req,res,next)=>{
  const image = req.file.path;
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

route.put("/client/me/update/:mail",async(req, res, next)=>{
    userModel.updateProfile(req.params.mail, req.body.username, req.body.phone, req.body.postal)
        .then((user)=>res.status(200).json({
            user:user,
            msg:'User Updated'
        }))

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
        const description = $(element).closest('.js-headline-text').next('.js-teaser').text();
        const link = $(element).attr('href');
        const image = $(element).closest('.js-headline-text').prev('.js-thumbnail').find('img').attr('src'); // Add image extraction

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



// Endpoint for scraping product data
route.get('/alibaba', async (req, res) => {
  try {
    // Fetch HTML from alibaba.com
    const response = await axios.get('https://www.amazon.com/s?crid=36QNR0DBY6M7J&k=shelves&ref=glow_cls&refresh=1&sprefix=s%2Caps%2C309');
    const html = response.data;

    // Parse HTML with Cheerio
    const $ = cheerio.load(html);

    // Extract product data
    const products = [];
    $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((_idx, el) => {
      const shelf = $(el)
      const title = shelf.find('span.a-size-base-plus.a-color-base.a-text-normal').text()
      const image = shelf.find('img.s-image').attr('src')
      const link = shelf.find('a.a-link-normal.a-text-normal').attr('href')
      
      

      products.push(title,image,link)
  });

    

    res.status(200).json({ message: 'Scraping successful!', products });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});













module.exports = route;