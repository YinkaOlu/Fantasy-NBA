/**
 * Created by yinka_000 on 2015-10-21.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

//create team model from team Schema
var userModel = require('../models/user');

/* GET login page. */
router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('FantasyPage/index', { message: req.flash('message') });
});

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/FantasyTeam');
}
/* GET home page. */
router.get('/home', isAuthenticated, function(req, res, next) {
    console.log(req);
    res.render('FantasyPage/fantasyPage', { user: req.user });
});

router.get('/userID', function(req, res){
    console.log('Retrieving User ID');
    res.json(req.user._id);
});


/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
    successRedirect: '/FantasyTeam/home',
    failureRedirect: '/FantasyTeam/',
    failureFlash : true
}));

router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/FantasyTeam');
});

/* GET Registration Page */
router.get('/signup', function(req, res){
    res.render('FantasyPage/register',{message: req.flash('message')});
});

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/FantasyTeam/home',
    failureRedirect: '/FantasyTeam/signup',
    failureFlash : true
}));

module.exports = router;