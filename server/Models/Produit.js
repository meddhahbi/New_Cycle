const mongoose = require('mongoose');
const mlKnn = require('ml-knn');
//const products = require('../models/Produit');

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
  city: {
    type: String
  },
  region: {
    type: String
  },
  images: {type:String, required: true},
  productOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
});

const Product = mongoose.model('Product', productSchema);
const url = process.env.URL;
const k = 5; // number of nearest neighbors to use in regression

const trainModel = (products, category) => {
  const categoryProducts = products.filter((product) => product.category === category);
  const X = categoryProducts.map((product) => [product.description.length]);
  const Y = categoryProducts.map((product) => product.price);
  const knn = new mlKnn(X, Y, {k: 5});
  return knn;
};

// get a trained model and estimate the price of a product
exports.estimatePrice = async (description, category) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const allProducts = await products.AllProducts();
    const knn = trainModel(allProducts, category);
    const estimatedPrice = knn.predict([[description.length]]);
    mongoose.disconnect();
    return { estimatedPrice: estimatedPrice[0] };
  } catch (error) {
    mongoose.disconnect();
    throw error;
  }
};

// create a product with estimated price or provided price
exports.createProduct = async (name, description, price, category, images,city, region, idUser) => {
  try {
    console.log(city)
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    let product = new Product({
      name: name,
      description: description,
      category: category,
      images: images.split("uploads")[1],
      city: city,
      region: region,
      productOwner: idUser,
      
    });

    if (price) {
      product.price = price;
      await product.save();
    } else {
      const allProducts = await products.AllProducts();
      const knn = trainModel(allProducts, category);
      const estimatedPrice = knn.predict([[description.length]]);
      product.price = estimatedPrice[0];


      let prod = await product.save();
      console.log(prod)
    }

    //mongoose.disconnect();
    return product;
  } catch (error) {
   // mongoose.disconnect();
    throw error;
  }
};






exports.AllProducts = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Product.find({}).populate("productOwner", "username image")
            .then((products) => {
             // mongoose.disconnect();
              console.log(products)
              resolve(products);
            })
            .catch((err) => {
             // mongoose.disconnect();
              reject({ message: "Failed to retrieve products from database", error: err });
            });
        })
        .catch((err) => {
        //  mongoose.disconnect();
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
            //  mongoose.disconnect();
              resolve(product);
            })
            .catch((err) => {
           //   mongoose.disconnect();
              reject({ message: "Failed to retrieve product from database", error: err });
            });
        })
        .catch((err) => {
        //  mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
        });
    });
  };
  

  exports.updateProduit = (name, description, price, category, images) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log("prod")
        Product.findByIdAndUpdate(id, {
          name: name,
          description: description,
          price: price,
          category:category,
          images: images.split("uploads")[1]
        }, {new: true})
          .then((Product) => {
           // mongoose.disconnect();
            resolve(Product);
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
  

  exports.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Product.findByIdAndDelete(id)
            .then(() => {
         //     mongoose.disconnect();
              resolve();
            })
            .catch((err) => {
       //       mongoose.disconnect();
              reject({ message: "Failed to delete product from database", error: err });
            });
        })
        .catch((err) => {
      //    mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
        });
    });
  };
