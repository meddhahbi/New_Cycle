const express = require('express');
const route = require('express').Router();
const comment = require('../Models/Comment');



route.post('/',(req,res,next)=>{

      comment.createComment(req.body.comment)
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
  module.exports = route;