//Create router object
const express =require('express');
const router = express.Router();

//import product model
const Product = require('../models/products'); //import product model

//create routes

//handle admin route only
router.get('/', async (req, res) => { //user is trying to get something on the server render admin page

//_____Only admin control access_____//
    if (req.session.user){
        //check if user is admin
        if (req.session.user.perms == 'admin') {
//_____Only admin control access_____//

                products= await Product.find({}); //Find all products

                ctx={ //render admin page
                    title: 'Mia DreamSpace Admin',
                    message: 'Welcome to the admin page',
                    products: products,// pass products to the view
                    user: req.session.user //pass user session to the view
                }
                res.render('admin/dashboard.ejs',ctx); //render dashboard.ejs template with context

//_____Only admin control access_____//
        } else {
            //if user is not admin, redirect to home page
            res.redirect('/');
        }

    }else{
        res.redirect('/auth'); //if no user session, redirect to auth page
    }    
//_____Only admin control access_____//

});

//1.Adding a new product to database(create product)______________________________________Adding a new product to database____________________________________
router.post('/create-product',(req, res) => {
    //get all form data
    //console.log(req.body);
    productData={
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock:req.body.stock,
        sale: req.body.sale === 'on' ? true : false, //convert to boolean,
        image: req.body.image //Base64 string
       
    };

    //console.log(productData);

 //create new product instance
    const newProduct = new Product(productData);
    //save product to database
    newProduct.save()
        .then(() => {
        
            res.redirect('/admin');
        })
        .catch((err) => {
            console.error('Error saving product:', err);
            // res.status(500).send('Imternal server Error')
            res.redirect('/admin');
        });
});
//1.Adding a new product to database______________________________________Adding a new product to database____________________________________


//2.Display product on the admin dashboard______________________________Display product on the admin dashboard__________________
router.get('/edit-product/:id', async (req, res) => {
    id= req.params.id; //get product id from url
    product= await Product.findOne({_id: id}); //find all products
    // console.log(product);

    //render edit page
    res.render('admin/editProduct.ejs', {
        title: 'Mia DreamSpace Admin',
        message: 'Edit product',
        product: product //pass product to the view
    });   

});


router.post('/edit-product/:id', async (req, res) => {
    id= req.params.id; //get product id from url
    
    productData={
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        sale: req.body.sale === 'on' ? true : false, //convert to boolean
        image: req.body.image //base64 string
    };

    //console.log(productData);

    //find and update product
    await Product.findByIdAndUpdate(id, productData);

    res.redirect('/admin'); //redirect to admin page

});

router.get('/delete-product/:id', async (req, res) => {
    id= req.params.id; //get product id from url
    await Product.findByIdAndDelete(id) //delete product by id
        .then(() => {
            res.redirect('/admin'); //redirect to admin page
        })
        .catch((err) => {
            console.error('Error deleting product:', err);
            // res.status(500).send('Internal Server Error');
            res.redirect('/admin');
        });
   
});

//export router object
module.exports = router;