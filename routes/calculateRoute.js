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
//-----Calculate Season Stats for Individual Player (Player Stat Page -----------
//--------------------------------------------------------------------------------
router.route('/seasonStats/:player_id').get(function(req, res) {
    console.log('Calculating Season Stats...');
    console.log(req.params.player_id);
    gameModel.find({ associated_player:  req.params.player_id}, function (err, games){

        //Set Stat Variables to 0
        var PPG = 0;
        var APG = 0;
        var FGPer = 0;
        var BPG = 0;
        var threePPer = 0;
        var FTPer = 0;
        var RPG = 0;
        var TOV = 0;
        var Fouls = 0;
        var plusMinus = 0;
        var MPG = 0;
        var Steals = 0;

        var FGM = 0;
        var FGA = 0;

        var TPA = 0;
        var TPM = 0;

        var FTA = 0;
        var FTM = 0;

        //Determine the amount of games the player has played
        var gamesPlayed = games.length;
        console.log('Calculating Stats for '+gamesPlayed+' games');

        for (var i = 0; i < gamesPlayed; i++){
            PPG += games[i].PTS;
            APG += games[i].AST;
            RPG += (games[i].ORB + games[i].DRB);
            TOV += (games[i].TOV);
            Fouls += games[i].Fouls;
            BPG += games[i].BLK;
            plusMinus += games[i].plusMinus;
            MPG += games[i].minutes_played;
            Steals += games[i].STL;


            FGM += (games[i].FGM);
            FGA += (games[i].FGA);

            TPA += (games[i].threes_attempted);
            TPM += (games[i].threes_made);


            FTA += (games[i].FTA);
            FTM += (games[i].FTM);


        }
        var statResults = {};

        statResults.PPG = (PPG / gamesPlayed);
        statResults.APG = (APG / gamesPlayed);
        statResults.RPG = (RPG / gamesPlayed);
        statResults.TOV = (TOV / gamesPlayed);
        statResults.Fouls = (Fouls / gamesPlayed);
        statResults.BPG = (BPG / gamesPlayed);
        statResults.plusMinus = (plusMinus / gamesPlayed);
        statResults.MPG = (MPG / gamesPlayed);
        statResults.Steals = (Steals / gamesPlayed);

        statResults.FGPer = (FGM /FGA);
        statResults.threePPer = (TPM / TPA);
        statResults.FTPer = (FTM / FTA);
        console.log('Here are the stat results');
        console.log(statResults);

        // Send Stats in JSON Format
        res.json(statResults);
    });
});

router.route('/getFantasyStats/:startDate/:endDate/:pointGuardID').get(function(req, res) {
    console.log('Got Build Fantasy Team Request');
    console.log(req.params.startDate);
    console.log(req.params.endDate);
    console.log(req.params.pointGuardID);

    var startDate = new Date(req.params.startDate);
    var endDate = new Date(req.params.startDate);
    console.log(endDate);
    console.log(startDate);

    var PGQueryResults = [];
    var pointGuardID = req.params.pointGuardID;

    var PGGameQuery = gameModel.find({});

    PGGameQuery.where('game_Date').gte(startDate);
    PGGameQuery.where('game_Date').lte(endDate);
    PGGameQuery.where('associated_player', pointGuardID);

    PGGameQuery.exec(function (err, docs){
        console.log(docs);
        PGQueryResults = docs;
        console.log("*****");
        console.log(PGQueryResults);
    });

});

module.exports = router;
