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
  createdAt: { 
    type: Date, 
    default: Date.now 
  }

});

module.exports = mongoose.model('Blog', BlogSchema);