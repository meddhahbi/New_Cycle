
const route = require('express').Router();
const associationModel = require('../Models/Association');
const path = require('path');
const {Association} = require('../Models/Association');
const multer = require('multer');
const associationArticle = require('../Models/AssociationArticle')




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/Documents'); // set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname); // set the filename for uploaded files
    }
  });
  
  const fileFilter = function (req, file, cb) {
    // set the file filter for uploaded files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });





route.post('/register',upload.single('docVerif'),(req,res,next)=>{
    const docVerif = req.file.path;
    associationModel.register(req.body.name,req.body.email,req.body.password,req.body.phone,req.body.postal,docVerif)
    .then((association)=>res.status(200).json({
        association:association,
        msg:'Association registered successfully'
    }))
    .catch((err)=>res.status(400).json({error:err}));
})


route.post('/login',(req,res,next)=>{
    associationModel.login(req.body.email,req.body.password)
    .then((token)=>{res.status(200).json({
        token:token
    })
        console.log("req.headers.authorization")
        console.log(req.headers)
    console.log(token)})
    .catch((err)=>{res.status(400).json({error:err});console.log(err)});
})

route.put('/verifDoc/:email',(req,res,next)=>{
  associationModel.verifDoc(req.params.email)
  .then((association)=>{res.status(200).json({
    association:association
  })
  })
  .catch((err)=>{res.status(400).json({error:err});console.log(err)});
})






route.get('/getStatus/:email',async (req,res,next)=>{
  // associationModel.getStatus(req.params.email)
  // .then((isActive) => {
  //   res.status(200).json({  isActive });
  // })
    await Association.findOne({email:req.params.email})
        .then((assoc)=>{
            res.send(assoc)
        })
.catch((err)=>{res.status(400).json({error:err});console.log(err)});
  })


  route.post('/addPost',(req,res,next)=>{
    // const image = req.file.path;
     console.log(req.association);
     associationArticle.createArticle(req.body.associationName,req.body.title,req.body.description,req.body.quantity)
       .then((article)=>res.status(200).json({
           associationArticle:article,
           msg:'Article created successfully'
       }))
       .catch((err)=>res.status(400).json({error:err}));
   })




  route.get('/articles',(req,res,next)=>{
    associationArticle.AllArticles()
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
  });

  route.get('/recent-posts', async (req, res) => {
    associationArticle.getRecent()
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
  });


  route.get('/associations',(req,res,next)=>{
    associationModel.getAllAssociations()
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
  });


  route.get('/count',(req,res,next)=>{
    associationModel.getAllAssociationCount()
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
  })


module.exports = route;
