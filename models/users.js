const mongoose = require('mongoose');

//Define a class and things which will be included in the table
const userSchema = new mongoose.Schema({
//dictiionary here:
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    full_name: String,
    token: String,
    perms:{ //ths is a variable
        type: String,
        enum: ['admin','user'], //List of types of users for example manager
        default:'user' //
    }
});
//this is the object of the class const User
const User = mongoose.model('User', userSchema); // mongoose is the online system, it will be linked with the database

module.exports = User;