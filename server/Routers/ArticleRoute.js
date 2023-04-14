const express = require('express');
const route = require('express').Router();
const articles = require('../Models/Article');
const multer = require('multer');
const path = require('path');
const cheerio = require('cheerio');
const axios = require('axios');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // set the destination folder for uploaded files
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



route.post('/',upload.single('photo'),(req,res,next)=>{
  const image = req.file.path;
//console.log("image")
  //console.log(image)
    articles.createArticle(req.body.title,req.body.content,req.body.author,image)
    .then((article)=>res.status(200).json({
        article:article,
        msg:'Article created successfully'
    }))
    .catch((err)=>res.status(400).json({error:err}));
})



  route.delete('/:id', (req, res) => {
    const articleId = req.params.id;
  
    articles.deleteArticle(articleId)
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Article deleted successfully'
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Failed to delete article',
          error: err.message
        });
      });
  });

  route.put('/:id',upload.single('photo'),(req,res,next)=>{
    const image = req.file.path;
    articles.updateArticle(req.params.id, req.body.title, req.body.content, req.body.author,image)
    .then((article)=>res.status(200).json({
        article:article,
        msg:'article updated successfully'
    }))
    .catch((err)=>res.status(400).json({error:err}));
})
route.get('/', (req, res, next) => {
    articles.getAllArticles()
      .then((articles) => res.status(200).json({ articles: articles }))
      .catch((err) => res.status(400).json({ error: err }));
  });
  
  route.get('/:id', (req, res, next) => {
    const id = req.params.id;
    articles.getArticleById(id)
      .then((article) => res.status(200).json({ article: article }))
      .catch((err) => res.status(400).json({ error: err }));
  });



 



module.exports = route;