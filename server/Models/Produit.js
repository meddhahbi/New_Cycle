const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  }
});

//module.exports = mongoose.model('Product', productSchema);
var Product  = mongoose.model('Product',productSchema);
var url = process.env.URL;


exports.createProduct = (name, description, price, category, images) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          let product = new Product({
            name: name,
            description: description,
            price: price,
            category: category,
            images: images
          });
          product.save()
            .then((product) => {
              mongoose.disconnect();
              resolve(product);
            })
            .catch((err) => {
              mongoose.disconnect();
              reject({ message: "Failed to save product to database", error: err });
            });
        })
        .catch((err) => {
          mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
        });
    });
  };

  
  exports.AllProducts = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Product.find({})
            .then((products) => {
              mongoose.disconnect();
              resolve(products);
            })
            .catch((err) => {
              mongoose.disconnect();
              reject({ message: "Failed to retrieve products from database", error: err });
            });
        })
        .catch((err) => {
          mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
        });
    });
  };

  
  exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Product.findById(id)
            .then((product) => {
              mongoose.disconnect();
              resolve(product);
            })
            .catch((err) => {
              mongoose.disconnect();
              reject({ message: "Failed to retrieve product from database", error: err });
            });
        })
        .catch((err) => {
          mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
        });
    });
  };
  

  exports.updateProduct = (id, updates) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Product.findByIdAndUpdate(id, updates, { new: true })
            .then((product) => {
              mongoose.disconnect();
              resolve(product);
            })
            .catch((err) => {
              mongoose.disconnect();
              reject({ message: "Failed to update product in database", error: err });
            });
        })
        .catch((err) => {
          mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
        });
    });
  };
  

  exports.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Product.findByIdAndDelete(id)
            .then(() => {
              mongoose.disconnect();
              resolve();
            })
            .catch((err) => {
              mongoose.disconnect();
              reject({ message: "Failed to delete product from database", error: err });
            });
        })
        .catch((err) => {
          mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
        });
    });
  };
  