const mongoose = require('mongoose');
const { Article } = require('./Article');


const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
},
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",

}
  
});

var Comment = mongoose.model('Comment', commentSchema);
var url = process.env.URL;

const createComment = (comment,articleId,userId) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
       
        const cmt = new Comment({
          comment:comment,
          article:articleId,
          user:userId
      
        });
       //console.log()
        cmt.save().then( async (cmt) => {
          console.log(cmt);
          const article =await Article.findOne({_id:articleId})
          article.commentList.push(cmt._id);
          article.save();
          console.log(article);
          resolve(cmt);
        }).catch((err) => {
          reject({ message: "Failed to save comment to database", error: err });
        });
      }).catch((err) => {
        reject({ message: "Failed to connect to database", error: err });
      });
    });
  };

  const getAllComment = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        Comment.find().then((comments) => {
          resolve(comments);
        }).catch((err) => {
          reject({ message: "Failed to retrieve comments from database", error: err });
        });
      }).catch((err) => {
        reject({ message: "Failed to connect to database", error: err });
      });
    });
  };

  const getCommentsByArticle =(idArticle) =>{
    
        Comment.find({article:idArticle}).populate("user","username image").then((comments) => {

          resolve(comments);
        }).catch((err) => {
         console.log(err.message)
        });
      }
  

  module.exports = {
    Comment,
    createComment,
    getAllComment,
    getCommentsByArticle


};