const mongoose = require('mongoose');
const fs = require('fs');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  photo: { type: Buffer }
});

var Article = mongoose.model('Article', articleSchema);
var url = process.env.URL;




exports.createArticle = (title, content, image, author, photo) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
  

      // Create an article object with the image buffer and photo buffer
      let article = new Article({
        title: title,
        content: content,
        author: author,
        photo: photo
      });

      article.save().then((article) => {
        mongoose.disconnect();
        resolve(article);
      }).catch((err) => {
        mongoose.disconnect();
        reject({ message: "Failed to save article to database", error: err });
      });
    }).catch((err) => {
      mongoose.disconnect();
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
          mongoose.disconnect();
          resolve(article);
        }).catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
      }).catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
    });
  };

  exports.updateArticle = (id, title, content, image, author) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        Article.findByIdAndUpdate(id, {
          title: title,
          content: content,
          image: image,
          author: author
        }, {new: true})
          .then((article) => {
            mongoose.disconnect();
            resolve(article);
          })
          .catch((err) => {
            mongoose.disconnect();
            reject(err);
          });
      }).catch((err) => {
        mongoose.disconnect();
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
          mongoose.disconnect();
  
          // Convert photo buffer to base64-encoded string
          articles = articles.map((article) => {
            if (article.photo) {
              article.photo = article.photo.toString('base64');
            }
            return article;
          });
  
          resolve(articles);
        }).catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
      }).catch((err) => {
        mongoose.disconnect();
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
          mongoose.disconnect();
          resolve(article);
        }).catch((err) => {
          mongoose.disconnect();
          reject(err);
        });
      }).catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
    });
  };

  
  //module.exports = Article;