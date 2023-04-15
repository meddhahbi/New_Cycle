const mongoose = require('mongoose');
const fs = require('fs');




const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  photo: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
}
});

var Article = mongoose.model('Article', articleSchema);
var url = process.env.URL;



exports.createArticle = (title, content, author, photo,userId) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
     
      const article = new Article({
        title:title,
        content:content,
        author:author,
        photo: photo.split("uploads")[1],
        user:userId
       
      });
      console.log()
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


  exports.deleteArticle = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        Article.findByIdAndDelete(id).then((article) => {
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

  exports.updateArticle = (id, title, content, author,photo) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        Article.findByIdAndUpdate(id, {
          title: title,
          content: content,
          author: author,
          photo: photo.split("uploads")[1]
        }, {new: true})
          .then((article) => {
           // mongoose.disconnect();
            resolve(article);
          })
          .catch((err) => {
           // mongoose.disconnect();
            reject(err);
          });
      }).catch((err) => {
        //mongoose.disconnect();
        reject(err);
      });
    });
  };

  exports.getAllArticles = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        Article.find().lean().then((articles) => {
         // mongoose.disconnect();
  
          // Convert photo buffer to base64-encoded string
          articles = articles.map((article) => {
            if (article.photo) {
              article.photo = article.photo.toString('base64');
            }
            return article;
          });
  
          resolve(articles);
        }).catch((err) => {
          //mongoose.disconnect();
          reject(err);
        });
      }).catch((err) => {
       // mongoose.disconnect();
        reject(err);
      });
    });
  };

  exports.getArticleById = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        Article.findById(id).exec().then((article) => {
          //mongoose.disconnect();
          resolve(article);
        }).catch((err) => {
          //mongoose.disconnect();
          reject(err);
        });
      }).catch((err) => {
        //mongoose.disconnect();
        reject(err);
      });
    });
  };

  exports.getLastThreeArticles = async () => {
    try {
      const articles = await Article.find()
        .sort({ createdAt: -1 }) // Sort by descending order of createdAt field
        .limit(3); // Limit to 3 documents
      return articles;
    } catch (err) {
      throw new Error('Failed to get last three articles');
    }
  };


  
  
  //module.exports = Article;