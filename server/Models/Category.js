// <<<<<<< HEAD
// const mongoose = require('mongoose');
//
// const CategorySchema = new mongoose.Schema({
//     name: { type: String, required: true, unique:true},
//     description: { type: String, required: true, unique:true},
//
//
// });
//
// var Category = mongoose.model('Category', CategorySchema);
//
// module.exports = {
//     Category
//
// };
// =======

const mongoose = require('mongoose');
const { deserializeUser } = require('passport');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true},
    description: { type: String},


});

var Category = mongoose.model('Category', CategorySchema);
var url = process.env.URL;

const createCategory = (name, description) => {


  return new Promise((resolve, reject) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {     
      const cat = new Category({
        name:name,
        description:description,
      });
      console.log()
      cat.save().then((c) => {
        resolve(c);
      }).catch((err) => {
        reject({ message: "Failed to save  to database", error: err });
      });
    }).catch((err) => {

      reject({ message: "Failed to connect to database", error: err });
    });
  });
};

const deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        Category.findByIdAndDelete(id).then((cat) => {
          //mongoose.disconnect();
          resolve(cat);
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

  const updateCategory = (id, name, description) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        Category.findByIdAndUpdate(id, {
          name: name,
          description:description
        }, {new: true})
          .then((cat) => {
           // mongoose.disconnect();
            resolve(cat);
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

  const getAll = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        Category.find().lean().then((cat) => {
         // mongoose.disconnect();
          resolve(cat);
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

  getById = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          Category.findById(id)
            .then((cat) => {
            //  mongoose.disconnect();
              resolve(cat);
            })
            .catch((err) => {
           //   mongoose.disconnect();
              reject({ message: "Failed to retrieve  from database", error: err });
            });
        })
        .catch((err) => {
        //  mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
        });
    });
  };


module.exports = {
    Category,
    deleteCategory,
    updateCategory,
    getAll,
    getById,
    createCategory

};
