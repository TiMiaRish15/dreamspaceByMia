//Create router object
const express =require('express');
const router = express.Router()

//import product model
const Product = require('../models/products'); //import product model

//create routes

//handle home route only
router.get('/',async(req, res) =>{ //user is trying to get something on the server

//_______Enforce control_________To remove later

//if (req.session.user) {
    products= await Product.find({}); //find all products

 //_______Enforce control on home_________ To remove later

    ctx={
        title: 'Welcome to DreamSpace By Mia',
        message: 'Good to have you here',
        notifs: true,
        products: products,// pass products to the view
        user: req.session.user //pass user session to the view
    }
        res.render('home/home.ejs',ctx); // render home.ejs template with context

//_______Enforce control_________To remove later 

//} else{
    //redirect to login page if user is not logged in
    //res.redirect('/auth'); //if no user session, redirect to auth page
//} 
 //_______Enforce control_________ To remove later

});

//export router object
module.exports = router;
