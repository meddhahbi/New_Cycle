const mongoose = require('mongoose');
const ml = require('ml-regression');

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
  images: [
    {
      url: {
        type: String,
        required: true
      },
      caption: {
        type: String,
        required: false
      }
    }
  ]
});

const Product = mongoose.model('Product', productSchema);
const url = process.env.URL;

// train a linear regression model to estimate price
const trainModel = (products) => {
  // create a vocabulary of words from descriptions and categories
  const vocabulary = new Set();
  products.forEach((product) => {
    product.description.split(' ').forEach((word) => vocabulary.add(word));
    product.category.split(' ').forEach((word) => vocabulary.add(word));
  });

  // create feature vectors for each product
  const X = products.map((product) => {
    const featureVector = Array.from(vocabulary).map((word) =>
      (product.description.includes(word) || product.category.includes(word)) ? 1 : 0
    );
    return featureVector;
  });

  // create target variable for each product
  const Y = products.map((product) => product.price);

  // train a linear regression model
  const regression = new ml.SimpleLinearRegression(X, Y);
  return regression;
};


// get a trained model and estimate the price of a product
exports.estimatePrice = async (description, category) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const products = await Product.find();
    const regression = trainModel(products);
    const estimatedPrice = regression.predict([[description.length, category.length]]);
    mongoose.disconnect();
    return { estimatedPrice: estimatedPrice[0] };
  } catch (error) {
    mongoose.disconnect();
    throw error;
  }
};

// create a product with estimated price or provided price
exports.createProduct = async (name, description, price, category, images) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    let product = new Product({
      name: name,
      description: description,
      category: category,
      images: []
    });

    if (price) {
      product.price = price;
      await product.save();
    } else {
      const products = await Product.find();
      const regression = trainModel(products);
      const estimatedPrice = regression.predict([[description.length, category.length]]);
      product.price = estimatedPrice[0];

      images.forEach((image) => {
        product.images.push({
          url: image,
          caption: ''
        });
      });

      await product.save();
    }

    mongoose.disconnect();
    return product;
  } catch (error) {
    mongoose.disconnect();
    throw error;
  }
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
  