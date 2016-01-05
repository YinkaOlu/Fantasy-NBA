/**
 * Created by yinka_000 on 2015-10-21.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

/* GET login page. */
router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('FantasyPage/index', { message: req.flash('message') });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('FantasyPage/fantasyPage', { title: 'Fantasy Page' });
});

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
    successRedirect: '/FantasyTeam/home',
    failureRedirect: '/FantasyTeam/index',
    failureFlash : true
}));

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