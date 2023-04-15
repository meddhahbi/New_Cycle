
const route = require('express').Router();
const associationModel = require('../Models/Association');
const path = require('path');
const multer = require('multer');



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
    console.log(token)})
    .catch((err)=>{res.status(400).json({error:err});console.log(err)});
})

route.put('/verifDoc/:email',(req,res,next)=>{
  associationModel.verifDoc(req.params.email)
  .then(()=>{res.status(200).json({
    msg:'docverif'
  })
  })
  .catch((err)=>{res.status(400).json({error:err});console.log(err)});
})





route.get('/getStatus/:email',(req,res,next)=>{
  associationModel.getStatus(req.params.email)
  .then((isActive) => {
    res.status(200).json({  isActive });
  })
.catch((err)=>{res.status(400).json({error:err});console.log(err)});
  })


module.exports = route;