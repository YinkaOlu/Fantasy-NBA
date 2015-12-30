/**
 * Created by yinka_000 on 2015-10-21.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('FantasyPage/fantasyPage', { title: 'Fantasy Page' });
});


module.exports = router;