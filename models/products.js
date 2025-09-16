const mongoose = require('mongoose');

//Define a class and things which will be included in the table
const productSchema = new mongoose.Schema({
//dictiionary here:
    name: {
        type:String,
        required:true, //It means the name should be input
        unique: true
    },

    description: String,
    price: {
        type: Number,
        required: true 
    },

    category: String,
    stock: {
        type: Number,
        required: true 
    },

    sale: {
        type: Boolean,
        default: true
    },

    image: String

});

//this is the object of the class const User
const Product = mongoose.model('Product', productSchema); // mongoose is the online system, it will be linked with the database

module.exports = Product;