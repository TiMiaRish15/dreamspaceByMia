//import librairies
const express = require('express');
const session = require('express-session');// we import the session here - this should be const server-  error here ?????*******************************
const server = express(); //create server instance
const db= require('./db'); //import db connection from db.js

//import body-parser to parse form data
const bodyParser = require('body-parser');

//import routers
const homeRouter =  require('./routes/home'); //import home router
const adminRouter =  require('./routes/admin'); //import admin router
const blogRouter =  require('./routes/blog'); //import blog router
const shopRouter =  require('./routes/shop'); //import shop router
const authRouter =  require('./routes/auth'); //import auth router
const cartRouter =  require('./routes/cart'); //import auth router
const detailsRouter =  require('./routes/details'); //import auth router

//Middleware to log request
function logger(req,res,next){
    //log the request method and url
    console.log('${req.url}');
    next();
};

//link public directory for static files
server.use(express.static('public'));

//link views directory for ejs templates
server.set('views', './views'); //set views directory


// logger means  any request that comes in, it shows when someone
//  sends a request, like the server gets a request and it logs it 
server.use(logger); //use the logger middleware


//connect body-parser middleware to parse form data, this will allow to load huge image
server.use(bodyParser.urlencoded({ extended: true, limit: "100mb"})); //parse urlencoded data

//Create session middleware
server.use(session({
    secret:"wdcvgy56yhjtfgtet23t7&",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 day -in milliseconds
    }
}));

 
//connect routers
server.use('', homeRouter); //use home router for root path
server.use('/admin', adminRouter); //use admin router for root path
server.use('/blog', blogRouter); //use blog router for root path
server.use('/shop', shopRouter); //use shop router for root path
server.use('/auth', authRouter); //use auth router for root path
server.use('/cart', cartRouter); //use auth router for root path
server.use('/details', detailsRouter); //use details router for root path

//Not found- capture all other routes- default 404 handler
server.use((req, res, next) => {
    res.send('Page not found');
});


//error handling middleware only
server.use((err, req, res, next) => {
    console.error(err.stack);
    //res.status(500).send('Something went wrog!')
    res.send('Error occured');
});


// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

