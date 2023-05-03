const mongoose = require('mongoose');

const articleAssociationSchema = new mongoose.Schema({
  // associationName: { type: String, required: true },
  association: { type: mongoose.Schema.Types.ObjectId, ref: "Association" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  quantity : {type:Number, required:true},
  restingQuantity : {type:Number},

 
});

var ArticleAssociation = mongoose.model('ArticleAssociation', articleAssociationSchema);
var url = process.env.URL;

createArticle = (associationName,title, description,quantity) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      const article = new ArticleAssociation({
        // associationName : associationName,
        title: title,
        description: description,
        //image: image.split("uploads")[1],
        quantity: quantity,
      });
      article.save().then((article) => {
        resolve(article);
      }).catch((err) => {
        reject({ message: "Failed to save article to database", error: err });
      });
    }).catch((err) => {
      reject({ message: "Failed to connect to database", error: err });
    });
  });
};

AllArticles=()=>{
  return new Promise((resolve,reject)=>{
      mongoose.connect(url,{
          useNewUrlParser: true,
          useUnifiedTopology: true
      }).then(()=>{

          return ArticleAssociation.find();

      }).then((doc)=>{
          resolve(doc);
      }).catch((err)=>{
          reject(err);
      })
  })
}


getRecent=()=>{
  return new Promise((resolve,reject)=>{
    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{

        return ArticleAssociation.find().sort({ createdAt: -1 }).limit(4);

    }).then((doc)=>{
        resolve(doc);
    }).catch((err)=>{
        reject(err);
    })
})
}

const deleteArticle = (id) => {



  return new Promise((resolve, reject) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      ArticleAssociation.findByIdAndDelete(id).then((article) => {
        //mongoose.disconnect();
        resolve(article);
      }).catch((err) => {
       // mongoose.disconnect();
        reject(err);
      });
    }).catch((err) => {
     // mongoose.disconnect();
      reject(err);
    });
  });
};



  module.exports = {
    ArticleAssociation,
    createArticle,
    AllArticles,
    getRecent,
    deleteArticle
   
};
