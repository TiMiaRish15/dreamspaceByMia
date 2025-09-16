//Create router object
const express = require('express');
const router = express.Router();


//import purchases/product model
const Purchases = require('../models/purchases');//import purchases model
const Product = require('../models/products'); //import product model


//handle purchase route only
router.get('/', async (req, res) =>{ //user is trying to get something on the server

//_______Enforce control on shop_________ 


//if (req.session.user) {
    products= await Product.find({}); //find all products

//_______Enforce control on shop_________ 

    //render blog page
    ctx={
        title: 'Mia DreamSpace - Shop',
        message: 'View your purchase history',
        notifs: true,
        products: products,// pass products to the view
        user: req.session.user //pass user session to the view
    }
        res.render('cart/details.ejs',ctx); // render shop.ejs template with context 


//_______Enforce control_________ 

//} else{
    //redirect to shop page if user is not logged in
    //res.redirect('/auth'); //if no user session, redirect to auth page
//} 

//_______Enforce control_________ 

});


//export router object
module.exports = router;