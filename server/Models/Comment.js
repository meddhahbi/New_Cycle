const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
  
  
});

var Comment = mongoose.model('Comment', commentSchema);
var url = process.env.URL;

exports.createComment = (comment) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
       
        const cmt = new Comment({
          comment:comment
        
         
        });
        console.log()
        cmt.save().then((cmt) => {
          resolve(cmt);
        }).catch((err) => {
          reject({ message: "Failed to save comment to database", error: err });
        });
      }).catch((err) => {
        reject({ message: "Failed to connect to database", error: err });
      });
    });
  };

  exports.getAllComment = () => {
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