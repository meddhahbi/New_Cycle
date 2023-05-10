const express = require('express');
const route = require('express').Router();
const comment = require('../Models/Comment');
const {Comment} = require('../Models/Comment');
const {protect} = require('../middleware/authmiddleware');



route.post('/', protect, async (req, res) => {
    try {   
      const { text } = req.body;
      let sanitizedText = text;
      const createdComment = await comment.createComment(sanitizedText, req.body.articleId, req.user._id);
      res.status(200).json({
        cmt: createdComment,
        msg: 'Comment created successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Failed to create comment' });
    }
  });




  route.get('/',(req,res,next)=>{

    comment.getAllComment()
    .then((cmt)=>res.status(200).json({
        cmt:cmt
        
    }))
    .catch((err)=>res.status(400).json({error:err}));
})

route.get('/commentByArticle/:id',(req,res,next)=>{

    // console.log(req.params.id);
    // comment.getCommentsByArticle(req.params.id)
    // .then((cmt)=>res.status(200).json({
    //     cmt:cmt
        
    // }))
    // .catch((err)=>res.status(400).json({error:err}));
    Comment.find({article:req.params.id}).populate("user","username image").then((comments) => {
        console.log()
        res.send(comments);
      }).catch((err) => {
       console.log(err.message)
      });
      
})
  module.exports = route;