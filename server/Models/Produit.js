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
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required:true
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  region: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
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
const createProduct = async (name, description, price, category, stock, images, country, city, region, latitude, longitude, idUser) => {
  try {
    console.log(city)
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    let product = new Product({
      name: name,
      description: description,
      category: category,
      images: images.split("uploads")[1],
      stock:stock,
      country: country,
      city: city,
      region: region,
      latitude: latitude,
      longitude: longitude,
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






const AllProducts = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Product.find({stock:{$ne:0}})
              .populate("productOwner", "username image")
              // .populate("Category", "name")
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

  
  const getProductById = (id) => {
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
  

  const updateProduit = (name, description, price, category, images) => {
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
  

  const deleteProduct = (id) => {
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


  module.exports = {
    Product,
    createProduct,
    AllProducts,
    getProductById,
    updateProduit,
    deleteProduct
  }
