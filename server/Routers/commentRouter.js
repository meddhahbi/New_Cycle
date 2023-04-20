const express = require('express');
const route = require('express').Router();
const comment = require('../Models/Comment');
const {Comment} = require('../Models/Comment');
const {protect} = require('../middleware/authmiddleware');



route.post('/',protect,(req,res,next)=>{
      comment.createComment(req.body.comment,req.body.articleId,req.user._id)
      .then((cmt)=>res.status(200).json({
          cmt:cmt,
          msg:'Comment created successfully'
      }))
      .catch((err)=>res.status(400).json({error:err}));
  })



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