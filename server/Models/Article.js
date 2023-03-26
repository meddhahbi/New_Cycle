const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    //type: mongoose.Schema.Types.ObjectId,
    //ref: 'User'
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Article = mongoose.model('Article', articleSchema);
var url = process.env.URL;




exports.createArticle = (title, content, image, author) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        let article = new Article({
          title: title,
          content: content,
          image: image,
          author: author
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
        Article.find().then((articles) => {
          mongoose.disconnect();
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