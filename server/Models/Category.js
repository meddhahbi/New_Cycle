const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true},
    description: { type: String, required: true, unique:true},


});

var Category = mongoose.model('Category', CategorySchema);

module.exports = {
    Category

};
