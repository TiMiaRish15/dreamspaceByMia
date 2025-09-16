//Create router object
const express =require('express');
const router = express.Router()

//import product model
const Product = require('../models/products'); //import product model


//handle shop route only
router.get('/', async (req, res) =>{ //user is trying to get something on the server

//_______Enforce control on shop_________ 
//if (req.session.user) {
//_______Enforce control on shop_________ 

    products= await Product.find({}); //find all products


    //render blog page
    ctx={
        title: 'Mia DreamSpace - Shop',
        message: 'Welcome to the shop page',
        notifs: true,
        products: products,// pass products to the view
        user: req.session.user //pass user session to the view
    }
        res.render('shop/shop.ejs',ctx); // render shop.ejs template with context 


//_______Enforce control_________ 

//} else{
    //redirect to shop page if user is not logged in
    //res.redirect('/auth'); //if no user session, redirect to auth page
//} 

//_______Enforce control_________ 

});

//-----------------------//
router.get('/search', async (req, res) => {
    const keyword = req.query.keyword; 

    let products = [];

    if (keyword) {
        //find products that match the keyword
        products = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        });
    }else{
        //if no keyword, return all products
        products = await Product.find({});
    }


    ctx = {
        title: 'Search Results',
        message: `Results for "${keyword}"`,
        products: products //pass products to the view
    };

    console.log("Search Results: ", products);

    res.render('shop/searchResults.ejs', ctx); //render search results.ejs template with context

    
});


//export router object
module.exports = router;