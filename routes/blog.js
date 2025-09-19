//Create router object
const express =require('express');
const router = express.Router();


//import product model

const Blog = require('../models/blogs'); // import Blog model


//create routes

//Create blog post-submit
router.post('/create-blog', async (req, res) => {
   
  if (!req.session.user) {
    return res.redirect('/auth'); // enforce login
  }

  try {
    const { title, content, author, image } = req.body;

    const newBlog = new Blog({
      title,
      content,
      author,
      image
    });

    await newBlog.save();

    res.redirect('/admin'); // redirect to blog list or confirmation page
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).send('Something went wrong while creating the blog.');
  }
});

//Create blog post-submit



//handle blog route only
router.get('/', async (req, res) => {
 

  try {
    
    const blogs = await Blog.find({}).sort({ createdAt: -1 }); // newest first

    const ctx = {
      title: 'Mia DreamSpace - Blog',
      message: 'Welcome to the blog page',
      notifs: true,
      blogs: blogs, // pass blogs to the view
      user: req.session.user
    };

    res.render('blog/blog.ejs', ctx);
  } catch (err) {
    console.error('Error loading blog page:', err);
    res.status(500).send('Something went wrong while loading the blog page.');
  }
});


//export router object
module.exports = router;


