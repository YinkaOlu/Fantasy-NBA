/**
 * Created by yolu on 4/19/2016.
 */
var express = require('express');
var router = express.Router();


var MongoClient = require('mongodb').MongoClient;

var mongoose = require('mongoose');

//create advancedSeason model from advancedSeason Schema
var AdvancedSeasonModel = require('../models/advancedSeason');

//create basicSeason model from basicSeason Schema
var BasicSeasonModel = require('../models/basicSeason');

//create game model from game Schema
var gameModel = require('../models/game');

//create player model from player Schema
var playerModel = require('../models/player');

//create season model from season Schema
var seasonModel = require('../models/season');

//create shootingSeason model from shootingSeason Schema
var shootingSeasonModel = require('../models/shootingSeason');

//create team model from team Schema
var teamModel = require('../models/team');

//
var fantasyModel = require('../models/fantasyTeam');

var userModel = require('../models/user');

var favPlayerModel = require('../models/favPlayer');

//----------------------------------Query to find Games by Player ID ------------------------------------
//----------------------------------------------------------------------------------------------------
router.route('/findGames/:player_id').get(function(req, res) {
    console.log('Finding played games');
    console.log(req.params.player_id);
    gameModel.find({ associated_player:  req.params.player_id}, function (err, docs){
        console.log(docs);
        res.json(docs);
    });
});

module.exports = router;