const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({

    title: {
    type: String,
    required: true,
   
  },
  
   content: {
    type: String,
    required: true
  },

  author: String,
  image: String, // URL to the blog image
  //likedAmount: Number, // The amount of times that the blog has been liked
  createdAt: { 
    type: Date, 
    default: Date.now 
  }

});

module.exports = mongoose.model('Blog', BlogSchema);