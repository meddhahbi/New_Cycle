const express = require('express');
const route = require('express').Router();
const articles = require('../Models/Article');


route.post('/', (req, res, next) => {
  // Convert the base64-encoded photo data to a Buffer
  const photo = Buffer.from(req.body.photo, 'base64');
  
  articles.createArticle(req.body.title, req.body.content, req.body.image, req.body.author, photo)
    .then((article) => res.status(200).json({
      article: article,
      message: 'Article created successfully'
    }))
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: 'Failed to create article' });
    });
});

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

  route.put('/:id',(req,res,next)=>{
    articles.updateArticle(req.params.id, req.body.title, req.body.content, req.body.image, req.body.author)
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