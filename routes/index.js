var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/nbaDB';
var path = require('path');

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
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('splashPage', { title: 'Opening Splash Page' });
});


//Respond to nba-current NBA db request
router.get('/currentNBAdb', function(req, res) {
  console.log('request to current DB');
  var db = req.db;
  var currentNBA;

  currentNBA = db.get('currentNBA');


  console.log('Preparing to send ordered time');
  currentNBA.find({},{}, function(e,docs){
    res.json(docs);
    console.log('sent data');
  });
  console.log('finish HTTP Response, end of get function');
});


//-----------------------------------------------------
//----------Add Game Function--------------------------
//-----------------------------------------------------

var insertGame = function(newGame, db, callback) {
  console.log('Running insertGame Function');
  db.collection('currentNBA').updateOne(
      {"team_name" : newGame.teamName, "roster.player_name": newGame.playerName},

      {$push: {'roster.$.currentSeasonGames': newGame}},

      function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a Game");
        callback(result);
      });
};
//--------------Post HTTP for Adding Games -----------------------------------------

router.post('/addGameDB', function(req, res){

  console.log('Recieve Game addition request. Following is received Game');
  console.log(req.body);
//-------------------
  MongoClient.connect(url, function(err, db) {
    console.log('MongoClient Connect')
    assert.equal(null, err);
    console.log('MongoClient intiate insertGame Function');
    insertGame(req.body, db, function() {
      db.close();
    });
  });
  //----------------------------
  console.log('Game Addition Successful passed');

});

router.get('/insertGame', function(req, res, next) {
  res.render('insertNewGame/insertNewGame', { title: 'Add Game' });
});

//-------------------------------------------------------------
//------------------------------------------------------------/
//-------------------Player Addition--------------------------
//------------------------------------------------------------

router.get('/insertPlayer', function(req, res, next) {
  res.render('insertNewPlayer/insertNewPlayer', { title: 'Add Player' });
});


//----------------------------------
//----------Add Player Function---------------------------------
var insertPlayer = function(newPlayer, db, callback) {

  db.collection('currentNBA').updateOne(
      {"team_name" : newPlayer.teamName},

      {$push: {'roster': newPlayer}},

      function(err, result) {
        assert.equal(err, null);
        console.log("Inserted game from: "+newPlayer.playerName+" into the nbaDB team: "+ newPlayer.teamName);
        callback(result);
      });
};
//--------------Post HTTP for Adding Games -----------------------------------------

router.post('/addPlayerDB', function(req, res){

  console.log('got player data');
  console.log(req.body);
//-------------------
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertPlayer(req.body, db, function() {
      db.close();
    });
  });
  //----------------------------
  console.log('Insertion passed');
  alert("Game Added");

});

//-----------------------------------------------------------------------------
//---------------------------  Edit Game  --------------------------------------
//------------------------------------------------------------------------------
router.get('/editGame', function(req, res, next) {
  res.render('editGames/editGames', { title: 'Edit Player' });
});

//----------------------------------
//----------remove Game Function---------------------------------
var removeGame = function(oldGame, db, callback) {
  console.log('Run removeGame function');
  console.log(oldGame.playerName);

  db.collection('currentNBA').updateOne(
      {"team_name" : oldGame.teamName, "roster.player_name": oldGame.playerName},

      {$pull: {'roster.$.currentSeasonGames': {'game_Date': oldGame.game_Date}}},
      function(err, result) {
        assert.equal(err, null);
        console.log("Removed Game");
        callback(result);
      });
};

//--------------Post HTTP for removing Games -----------------------------------------

router.post('/removeGameDB', function(req, res){
console.log('Receive HTTP request to remove game: Following is received game');

  console.log(req.body);
//-------------------
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('MongoClient initiate removeGame function');
    removeGame(req.body, db, function() {
      db.close();
    });
  });
  //----------------------------
  console.log('Removal passed');


});

//----------------------------------
//----------Edit Game Function---------------------------------
var editGame = function(newGame, db, callback) {
  console.log('Running insertGame Function');
  db.collection('currentNBA').updateOne(
      {"team_name" : newGame.teamName, "roster.player_name": newGame.playerName},

      {$push: {'currentSeasonGames': newGame}},

      function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a Game");
        callback(result);
      });
};
//--------------Post HTTP for Adding Games -----------------------------------------

router.post('/editGameDB', function(req, res){

  console.log('Recieve Game addition request. Following is received Game');
  console.log(req.body);
//-------------------
  MongoClient.connect(url, function(err, db) {
    console.log('MongoClient Connect');
    assert.equal(null, err);
    console.log('MongoClient intiate insertGame Function');
    editGame(req.body, db, function() {
      db.close();
    });
  });
  //----------------------------
  console.log('Game Addition Successful passed');

});





module.exports = router;
