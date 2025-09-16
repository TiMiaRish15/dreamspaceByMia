//Create router object
const express =require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //import bcrypt for password hashing

//import product model
const User = require('../models/users'); //import user model



//_______________create routes______________________________________//create routes_______________________-
//This route GET will allow the display/ render the LOGIN page- retrieve information
router.get('/', async  (req, res) => {
    ctx={
        title: 'Mia World - Login',
        message: 'Welcome back! Please login to your account',
        user: req.session.user //pass user session to the view
    }

    res.render('auth/login.ejs', ctx); //render login.ejs template with context
});


//This route GET will allow the display/ render the REGISTER page
router.get('/register', async (req, res) => {
      ctx={
        title: 'Mia World - Register',
        message: 'Welcome back! Create a new account',
        user: req.session.user //pass user session to the view
    }

    res.render('auth/register.ejs', ctx); //render regsister.ejs template with context
});

//___________________Time for user to login_____________________________
//Post is when a message is being sent to the server
router.post('/login', async (req, res) => {
    if (req.session.user){
        res.redirect('/'); //if user is already logged in, redirect to home page
    }else{
        email= req.body.email;
        password= req.body.password;

        //check if email and password are provided
        if (!(email || password)) {
            res.render('auth/login.ejs', {
                title: 'Mia World - Login',
                message: 'Please fill all fields'
            });
        }else{
            //check if user exists
            const existingUser = await User.find({email: email});
            if (existingUser.length === 0) {
                res.render('auth/login.ejs', {
                    title: 'Mia World - Login',
                    message: 'Wrong details, please try again'
                });
            }else{
                //check if password is correct
                const isPasswordValid = await bcrypt.compare(password, existingUser[0].password);
                if (!isPasswordValid) {
                    res.render('auth/login.ejs', {
                        title: 'Mia World - Login',
                        message: 'Wrong details, please try again'
                    });
                }else{
                    //create session and store user data

                    //re-generate token
                    token_data= {
                        email: existingUser[0].email,
                        password: existingUser[0].password,
                        date: new Date(Date.now()).toISOString()
                    };
                    token= await bcrypt.hash(JSON.stringify(token_data), 10);

                    user_session_data = {
                        email: existingUser[0].email,
                        full_name: existingUser[0].full_name,
                        token: token,
                        perms: existingUser[0].perms //default permission
                    };
                    //update user token in database
                    await User.updateOne({email: existingUser[0].email}, {token: token});
                    

                    req.session.user = user_session_data; //store user data in session
                    res.redirect('/'); //redirect to home page
                }
            }

        }
    }

});
//___________________Time for user to login_____________________________

//___________________To Register user_____________________________
//Post is when a message is being sent to the server
router.post('/register', async (req, res) => {
    //1.get form data here
    email= req.body.email;
    password= req.body.password;
    full_name= req.body.full_name;

    //2.check if user already exists and if all details( email, password, full name) have been entered
    //The below checks if user enters the three details
    if (!(email || password || full_name)) {
        res.render('auth/register.ejs', {
            title: 'Mia World - Register ',
            message: 'Please fill all fields'
        });
    }else{
    
        //check if user already exists
        const existingUser = await User.find({email: email});
            if (existingUser.length > 0) {
                res.render('auth/register.ejs', {
                    title: 'Mia World - Register ',
                    message: 'User already exists'
            });
        }else{
            //register new user
            //Step 1 hash password
            //can also add a try catch here
            hash= await bcrypt.hash(password, 10);
            //generate token
                token_data= {
                    email: email,
                    password: hash,
                    date: new Date(Date.now()).toISOString()
                };
                token= await bcrypt.hash(JSON.stringify(token_data), 10);

                //Create user data
                user_data={
                    email: email,
                    password: hash,
                    full_name: full_name,
                    token: token
                };

                //create new user instance to save in the database
                const newUser = new User(user_data);
                //save user to database
                await newUser.save();

                //create session and store user data
                user_session_data = {
                    email: newUser.email,
                    full_name: newUser.full_name,
                    token: newUser.token,
                    perms: newUser.perms //default permission
                };

                req.session.user = user_session_data; //store user data in session
                res.redirect('/'); //redirect to home page
            }
        }
    
    

});
//___________________To Register user_____________________________


//___________________To log out user_____________________________
router.get('/logout', (req, res) => {
    if (req.session.user) {
        //destroy session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/auth'); //redirect to auth page
            }
        });
    } else {
        res.redirect('/auth'); //if no user session, redirect to auth page
    }
});

//___________________To log out user_____________________________

//export router object
module.exports = router;