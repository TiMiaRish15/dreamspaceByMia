//import librairies
const express = require('express');
const server = express(); //create server instance

//Middleware to log request
function logger(req,res,next){
    //log the request method and url
    console.log('${req.url}');
    next();
};

//link public directory for static files
server.use(express.static('public'));


// logger means  any request that comes in, it shows when someone sends a request, like the server gets a request and it logs it 
server.use(logger); //use the logger middleware

//how to capture from different from specific routes
//handle home route only
server.get('/',(req, res) =>{ //user is trying to get something on the server
    res.send('Welcome to DreamSpace By Mia'); // server will send this request
});

server.get('/about',(req, res) =>{
    res.send('Welcome to the About us page');
});

server.get('/Contact',(req, res) =>{
    res.send('Feel free to Contact us');
});

//redirect to w3School page
server.get('/w3school',(req, res) =>{
    res.redirect('https://www.w3schools.com/');
});


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

