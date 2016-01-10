var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

//create team model from team Schema
var userModel = require('../models/user');

/* GET login page. */
router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('profilePages/index', { message: req.flash('message') });
});

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/userProfile');
}
/* GET home page. */
router.get('/home', isAuthenticated, function(req, res, next) {
    console.log(req);
    if(req.user.role != 'guest'){
        res.render('profilePages/userProfilePage', { user: req.user });
    }
    else{
        res.redirect('/choicePage');
    }
});

router.get('/userID', function(req, res){
    console.log('Retrieving User ID');
    res.json(req.user._id);
});


/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
    successRedirect: '/userProfile/home',
    failureRedirect: '/userProfile/',
    failureFlash : true
}));

router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/choicePage');
});

/* GET Registration Page */
router.get('/signup', function(req, res){
    res.render('profilePages/register',{message: req.flash('message')});
});

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/userProfile/home',
    failureRedirect: '/userProfile/signup',
    failureFlash : true
}));

module.exports = router;