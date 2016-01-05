var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('splashPage', { title: 'Opening Splash Page' });
});

/* GET API Home page. */
router.get('/apiHome', function(req, res, next) {
    res.render('apiViews/apiHome', { title: 'Admin Page' });
});


//------------------Routes for Team API Pages ----------------------------------------
//-------------------------------------------------------------------------------------
    /* GET CRUD Team page. */
    router.get('/teamForm', function(req, res, next) {
      res.render('apiViews/apiTeam/teamCRUD', { title: 'Team CRUD Page' });
    });

    /* GET create Team page. */
    router.get('/createTeam', function(req, res, next) {
      res.render('apiViews/apiTeam/createTeam', { title: 'Create Team Page' });
    });

    /* GET read Team page. */
    router.get('/readTeams', function(req, res, next) {
      res.render('apiViews/apiTeam/readTeams', { title: 'Read Team Page' });
    });

    /* GET update Team page. */
    router.get('/updateTeam', function(req, res, next) {
      res.render('apiViews/apiTeam/updateTeam', { title: 'Update Team Page' });
    });

    /* GET delete Team page. */
    router.get('/deleteTeam', function(req, res, next) {
      res.render('apiViews/apiTeam/deleteTeam', { title: 'Delete Team Page' });
    });

//------------------Routes for Player API Pages ----------------------------------------
//-------------------------------------------------------------------------------------
/* GET CRUD Player page. */
router.get('/playerForm', function(req, res, next) {
  res.render('apiViews/apiPlayer/playerCRUD', { title: 'Player CRUD Page' });
});

/* GET create Player page. */
router.get('/createPlayer', function(req, res, next) {
  res.render('apiViews/apiPlayer/createPlayer', { title: 'Create Player Page' });
});

/* GET read Player page. */
router.get('/readPlayers', function(req, res, next) {
  res.render('apiViews/apiPlayer/readPlayers', { title: 'Read Player Page' });
});

/* GET update Player page. */
router.get('/updatePlayer', function(req, res, next) {
  res.render('apiViews/apiPlayer/updatePlayer', { title: 'Update Player Page' });
});

/* GET delete Player page. */
router.get('/deletePlayer', function(req, res, next) {
  res.render('apiViews/apiPlayer/deletePlayer', { title: 'Delete Player Page' });
});

/* GET trade Player page. */
router.get('/tradePlayer', function(req, res, next) {
  res.render('apiViews/apiPlayer/tradePlayer', { title: 'Trade Player Page' });
});


//------------------Routes for Game API Pages ----------------------------------------
//-------------------------------------------------------------------------------------
/* GET CRUD Game page. */
router.get('/gameForm', function(req, res, next) {
    res.render('apiViews/apiGame/gameCRUD', { title: 'Game CRUD Page' });
});

/* GET create Game page. */
router.get('/createGame', function(req, res, next) {
    res.render('apiViews/apiGame/createGame', { title: 'Create Game Page' });
});

/* GET read Game page. */
router.get('/readGames', function(req, res, next) {
    res.render('apiViews/apiGame/readGames', { title: 'Read Game Page' });
});

/* GET update Game page. */
router.get('/updateGame', function(req, res, next) {
    res.render('apiViews/apiGame/updateGame', { title: 'Update Game Page' });
});

/* GET delete Game page. */
router.get('/deleteGame', function(req, res, next) {
    res.render('apiViews/apiGame/deleteGame', { title: 'Delete Game Page' });
});



//--------------------------------------------------------------
//---------------------------------------------------------------
//--------------------------------------------------------------




module.exports = router;
