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


isAccepted : { 
    type:Boolean,
    default: false,
}

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
estimatePrice = async (description, category) => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const allProducts = await products.AllProducts();
    const knn = trainModel(allProducts, category);
    const estimatedPrice = knn.predict([[description.length]]);
    //mongoose.disconnect();
    return { estimatedPrice: estimatedPrice[0] };
  } catch (error) {
   // mongoose.disconnect();
    throw error;
  }
};

// create a product with estimated price or provided price

createProduct = async (name, description, price, category, images,idUser) => {


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






AllProducts = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Product.find({isAccepted : true}).populate("productOwner", "username image")
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



AllProductsNotAccepted = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        Product.find({isAccepted : false}).populate("productOwner", "username image")
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

  
  getProductById = (id) => {
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
  

  updateProduit = (name, description, price, category, images) => {
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
  

  deleteProduct = (id) => {
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



  const accepteProduit = async (_id) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const produit = await Product.findById(_id);

        if (!produit) {
            throw new Error('produit not found');
        }

        console.log(_id);
        produit.isAccepted = true;
        const updatedProduit = await produit.save();

       // mongoose.disconnect();
        return updatedProduit;
    } catch (err) {
        console.log(err);
        //mongoose.disconnect();
        throw new Error('Failed to accept produit');
    }
};

getLatest = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      return Product.find().populate("productOwner").sort({ createdAt: -1 }).limit(4);
    }).then((doc) => {
      resolve(doc);
    }).catch((err) => {
      if (err instanceof mongoose.CastError) {
        reject(new Error("Invalid product ID"));
      } else {
        reject(new Error("Failed to retrieve product from database"));
      }
    });
  });
};



  module.exports = {
    Product,
    accepteProduit,
    deleteProduct,
    updateProduit,
    getProductById,
    AllProducts,
    createProduct,
    estimatePrice,
    AllProductsNotAccepted,
    getLatest,

  }