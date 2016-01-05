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



router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//----------------------------------Query to find Players on Team ------------------------------------
//----------------------------------------------------------------------------------------------------
router.route('/findRoster/:team_id').get(function(req, res) {
    console.log('Finding roster');
    console.log(req.params.team_id);
    playerModel.find({ player_team:  req.params.team_id}, function (err, doc){
        console.log(doc);
        res.json(doc);
    });
});

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

//----------------------------------Query to Games by Player ID in Date Range ------------------------
//----------------------------------------------------------------------------------------------------
router.route('/queryGameByDates/:player_ID/:player_Name/:startDate/:endDate').get(function(req, res) {
    console.log('Searching for games for player: ' + req.params.player_name+' '+ req.params.player_ID);
    console.log('Start Date: ' + req.params.startDate);
    console.log('End Date: ' + req.params.endDate);
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;
    var playerID = req.params.player_ID;
    console.log('Finding games in range now ......');

    var query = gameModel.find({});
        query.where('game_Date').gte(startDate);
        query.where('game_Date').lte(endDate);
        query.where('associated_player', playerID);

    query.exec(function (err, docs){
        console.log(docs);
        res.json(docs);
    });
});

//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//------------------------------------API for Teams ------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

router.route('/team')

    // create a team (accessed at POST http://localhost:8080/api/team)
    .post(function(req, res) {
    console.log("Got post request");
        var newTeam = new teamModel();      // create a new instance of the team model

        newTeam.team_name = req.body.team_name;  // set the team name (comes from the request)
        newTeam.arena = req.body.arena;  // set the team arena (comes from the request)

        newTeam.city = req.body.city;  // set the team city (comes from the request)
        newTeam.State = req.body.State;  // set the team state (comes from the request)
        newTeam.country = req.body.country;  // set the team country (comes from the request)

        newTeam.conference = req.body.conference;  // set the team conference (comes from the request)
        newTeam.division = req.body.division;  // set the team division (comes from the request)

        newTeam.head_coach = req.body.head_coach;  // set the team coach (comes from the request)
        newTeam.GM = req.body.GM;  // set the team GM (comes from the request)
        newTeam.owner = req.body.owner;  // set the team owner(comes from the request)

        newTeam.playoff_appearances = req.body.playoff_appearances;  // set the team playoff_appearances (comes from the request)
        newTeam.finals_appearances = req.body.finals_appearances;  // set the team finals_appearances (comes from the request)
        newTeam.historical_win_percentage = req.body.historical_win_percentage;  // set the team historical_win_percentage(comes from the request)
        newTeam.championships = req.body.championships;

        newTeam.teamPrimaryColour = req.body.teamPrimaryColour;  // set the team teamPrimaryColour (comes from the request)
        newTeam.teamSecondaryColour = req.body.teamSecondaryColour;  // set the team teamSecondaryColour (comes from the request)
        newTeam.teamTertiaryColour = req.body.teamTertiaryColour;  // set the team teamTertiaryColour (comes from the request)

        newTeam.currentSeason_wins = req.body.currentSeason_wins;  // set the team currentSeason_wins (comes from the request)
        newTeam.currentSeason_losses = req.body.currentSeason_losses;  // set the team currentSeason_losses (comes from the request)
        newTeam.total_Salary = req.body.total_Salary;  // set the team total_Salary (comes from the request)

        console.log(newTeam);
        // save the new team and check for errors
        newTeam.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'New Team created!' });
        });

    })
	
	// get all teams (accessed at GET http://localhost:8080/api/team)
    .get(function(req, res) {
		console.log('Got Get request');
        teamModel.find(function(err, teams) {
            if (err)
                res.send(err);
            res.json(teams);
			console.log(teams);
        });
    });
	
router.route('/team/:team_id')
    // get the team with that id (accessed at GET http://localhost:8080/api/bears/:team_id)
    .get(function(req, res) {
		console.log('Got Request to find one team');
        teamModel.findById(req.params.team_id, function(err, team) {
            if (err)
                res.send(err);
			console.log(team)
            res.json(team);
        })
	})
    	.put(function(req, res) {
		console.log("Got Edit Request for team name")
        // use our team model to find the team we want
        teamModel.findById(req.params.team_id, function(err, team) {

            if (err)
                res.send(err);

            team.team_name = req.body.team_name;  // update the team name
            team.arena = req.body.arena;  // update the team arena

            team.city = req.body.city;  // update the team city
            team.State = req.body.State;  // update the team state
            team.country = req.body.country;  // update the team country
            team.conference = req.body.conference;  // update the team conference

            team.head_coach = req.body.head_coach;  // update the head coach
            team.owner = req.body.owner;  // update the team owner

            team.playoff_appearances = req.body.playoff_appearances;  // update the team playoff appearances
            team.finals_appearances = req.body.finals_appearances;  // update the team finals appearances
            team.historical_win_percentage = req.body.historical_win_percentage;  // update the team win percentages

            team.teamPrimaryColour = req.body.teamPrimaryColour;  // update the team Primary Colour
            team.teamSecondaryColour = req.body.teamSecondaryColour;  // update the team Secondary Colour
            team.teamTertiaryColour = req.body.teamTertiaryColour;  // update the team Tertiary Colour

            team.currentSeason_wins = req.body.currentSeason_wins;  // update the team current season wins
            team.currentSeason_losses = req.body.currentSeason_losses;  // update the team current season loss
            team.total_Salary = req.body.total_Salary;  // update the team total salary

			console.log('Edited the team name: ');
			console.log(team);
            // save the team
            team.save(function(err) {
                if (err)
                    res.send(err);
				console.log(team);
                res.json({ message: 'team updated!' });
            });

        });
	})
	
	    .delete(function(req, res) {
			console.log('Delete Request Recieved');
			console.log('Removing '+ req.params.team_id);
			teamModel.remove({
				_id: req.params.team_id
			}, function(err, bear) {
				if (err)
					res.send(err);

				res.json({ message: 'Successfully deleted' });
				});
				console.log('Team Deleted');
		});
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//------------------------------------API for Players ------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
router.route('/player')

    // create a player (accessed at POST http://localhost:8080/api/player)
    .post(function(req, res) {
        console.log("Got post request");
        var newplayer = new playerModel();      // create a new instance of the player model

        newplayer.player_team= req.body.player_team;
        newplayer.player_first_name = req.body.player_first_name;  // set the player first name (comes from the request)
        newplayer.player_last_name = req.body.player_last_name;  // set the player first name (comes from the request)
        newplayer.player_number= req.body.player_number;  // set the player first name (comes from the request)
        newplayer.player_position= req.body.player_position;  // set the player first name (comes from the request)
        newplayer.player_NBA_start= req.body.player_NBA_start;  // set the player first name (comes from the request)
        newplayer.player_draft= req.body.player_draft;  // set the player first name (comes from the request)
        newplayer.player_preNBA_team= req.body.player_preNBA_team;  // set the player first name (comes from the request)
        newplayer.player_birthDate= req.body.player_birthDate;  // set the player first name (comes from the request)
        newplayer.player_height= req.body.player_height;  // set the player first name (comes from the request)
        newplayer.player_weight= req.body.player_weight;  // set the player first name (comes from the request)
        newplayer.player_salary= req.body.player_salary;  // set the player first name (comes from the request)
        newplayer.player_contract= req.body.player_contract;  // set the player first name (comes from the request)
        newplayer.years_on_contract= req.body.years_on_contract;  // set the player first name (comes from the request)
        newplayer.player_status= req.body.player_status;  // set the player first name (comes from the request)
        newplayer.player_injured= req.body.player_injured;  // set the player first name (comes from the request)

        newplayer.player_injury= req.body.player_injury;  // set the player first name (comes from the request)
        newplayer.player_injury_time= req.body.player_injury_time;  // set the player first name (comes from the request)
        newplayer.player_traded= req.body.player_traded;  // set the player first name (comes from the request)
        newplayer.player_previousTeam= req.body.player_previousTeam;  // set the player first name (comes from the request)

        newplayer.been_to_playOffs= req.body.been_to_playOffs;  // set the player first name (comes from the request)
        newplayer.playyOff_experience= req.body.playOff_experience;  // set the player first name (comes from the request)
        newplayer.playOff_appearances= req.body.playOff_appearances;  // set the player first name (comes from the request)

        newplayer.playOff_win_percentage= req.body.playOff_win_percentage;  // set the player first name (comes from the request)
        newplayer.been_to_finals= req.body.been_to_finals;  // set the player first name (comes from the request)
        newplayer.finals_appearances= req.body.finals_appearances;  // set the player first name (comes from the request)
        newplayer.finals_experiences= req.body.finals_experiences;  // set the player first name (comes from the request)
        newplayer.finals_win_percentage= req.body.finals_win_percentage;
        newplayer.finals_win_percentage= req.body.finals_win_percentage;

        newplayer.championships= req.body.championships;
        newplayer.finals_mvp= req.body.finals_mvp;
        newplayer.season_mvp= req.body.season_mvp;

        newplayer.rookie_season= req.body.rookie_season;
        newplayer.is_Retired= req.body.is_Retired;


        console.log(newplayer);
        // save the new player and check for errors
        newplayer.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'New player created!' });
        });

    })

    // get all players (accessed at GET http://localhost:8080/api/player)
    .get(function(req, res) {
        console.log('Got Get request');
        playerModel.find(function(err, players) {
            if (err)
                res.send(err);

            res.json(players);
            console.log(players);
        });
    });

router.route('/player/:player_id')
    // get the player with that id (accessed at GET http://localhost:8080/api/bears/:player_id)
    .get(function(req, res) {
        console.log('Got Request to find one player');
        playerModel.findById(req.params.player_id, function(err, player) {
            if (err)
                res.send(err);
            console.log(player);
            res.json(player);
        })
    })
    .put(function(req, res) {
        console.log("Got Edit Request for player name");
        // use our player model to find the player we want
        playerModel.findById(req.params.player_id, function(err, updatedPlayer) {

            if (err)
                res.send(err);

            updatedPlayer.player_team= req.body.player_team;
            updatedPlayer.player_first_name = req.body.player_first_name;  // set the player first name (comes from the request)
            updatedPlayer.player_last_name = req.body.player_last_name;  // set the player first name (comes from the request)
            updatedPlayer.player_number= req.body.player_number;  // set the player first name (comes from the request)
            updatedPlayer.player_position= req.body.player_position;  // set the player first name (comes from the request)
            updatedPlayer.player_NBA_start= req.body.player_NBA_start;  // set the player first name (comes from the request)
            updatedPlayer.player_draft= req.body.player_draft;  // set the player first name (comes from the request)
            updatedPlayer.player_preNBA_team= req.body.player_preNBA_team;  // set the player first name (comes from the request)
            updatedPlayer.player_birthDate= req.body.player_birthDate;  // set the player first name (comes from the request)
            updatedPlayer.player_height= req.body.player_height;  // set the player first name (comes from the request)
            updatedPlayer.player_weight= req.body.player_weight;  // set the player first name (comes from the request)
            updatedPlayer.player_salary= req.body.player_salary;  // set the player first name (comes from the request)
            updatedPlayer.player_contract= req.body.player_contract;  // set the player first name (comes from the request)
            updatedPlayer.years_on_contract= req.body.years_on_contract;  // set the player first name (comes from the request)
            updatedPlayer.player_status= req.body.player_status;  // set the player first name (comes from the request)
            updatedPlayer.player_injured= req.body.player_injured;  // set the player first name (comes from the request)

            updatedPlayer.player_injury= req.body.player_injury;  // set the player first name (comes from the request)
            updatedPlayer.player_injury_time= req.body.player_injury_time;  // set the player first name (comes from the request)
            updatedPlayer.player_traded= req.body.player_traded;  // set the player first name (comes from the request)
            updatedPlayer.player_previousTeam= req.body.player_previousTeam;  // set the player first name (comes from the request)

            updatedPlayer.been_to_playOffs= req.body.been_to_playOffs;  // set the player first name (comes from the request)
            updatedPlayer.playOff_experience= req.body.playOff_experience;  // set the player first name (comes from the request)
            updatedPlayer.playOff_appearances= req.body.playOff_appearances;  // set the player first name (comes from the request)

            updatedPlayer.playOff_win_percentage= req.body.playOff_win_percentage;  // set the player first name (comes from the request)
            updatedPlayer.been_to_finals= req.body.been_to_finals;  // set the player first name (comes from the request)
            updatedPlayer.finals_appearances= req.body.finals_appearances;  // set the player first name (comes from the request)
            updatedPlayer.finals_experiences= req.body.finals_experiences;  // set the player first name (comes from the request)
            updatedPlayer.finals_win_percentage= req.body.finals_win_percentage;

            updatedPlayer.championships= req.body.championships;
            updatedPlayer.finals_mvp= req.body.finals_mvp;
            updatedPlayer.season_mvp= req.body.season_mvp;

            updatedPlayer.rookie_season= req.body.rookie_season;
            updatedPlayer.is_Retired= req.body.is_Retired;

            console.log('Edited the player name: ');
            console.log(updatedPlayer);
            // save the player
            updatedPlayer.save(function(err) {
                if (err)
                    res.send(err);
                console.log(updatedPlayer);
                res.json({ message: 'player updated!' });
            });

        });
    })

    .delete(function(req, res) {
        console.log('Delete Request Recieved');
        console.log('Removing '+ req.params.player_id);
        playerModel.remove({
            _id: req.params.player_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
        console.log('player Deleted');
    });

//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//------------------------------------API for games ------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

router.route('/game')

    // create a game (accessed at POST http://localhost:8080/api/game)
    .post(function(req, res) {
        console.log("Got post request");
        var newgame = new gameModel();      // create a new instance of the game model

        newgame.player_Name = req.body.player_Name;
        newgame.associated_player = req.body.associated_player;
        newgame.game_Date = req.body.game_Date;
        newgame.minutes_played = req.body.minutes_played;
        newgame.FGM = req.body.FGM;
        newgame.FGA = req.body.FGA;
        newgame.threes_made = req.body.threes_made;
        newgame.threes_attempted = req.body.threes_attempted;
        newgame.FTM = req.body.FTM;
        newgame.FTA = req.body.FTA;
        newgame.ORB = req.body.ORB;
        newgame.DRB = req.body.DRB;
        newgame.AST = req.body.AST;
        newgame.STL = req.body.STL;
        newgame.BLK = req.body.BLK;
        newgame.TOV = req.body.TOV;
        newgame.Fouls = req.body.Fouls;
        newgame.PTS = req.body.PTS;
        newgame.plusMinus = req.body.plusMinus;

        console.log(newgame);
        // save the new game and check for errors
        newgame.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'New game created!' });
        });

    })

    // get all games (accessed at GET http://localhost:8080/api/game)
    .get(function(req, res) {
        console.log('Got Get request');
        gameModel.find(function(err, games) {
            if (err)
                res.send(err);

            res.json(games);
            console.log(games);
        });
    });

router.route('/game/:game_id')
    // get the game with that id (accessed at GET http://localhost:8080/api/bears/:game_id)
    .get(function(req, res) {
        console.log('Got Request to find one game');
        gameModel.findById(req.params.game_id, function(err, game) {
            if (err)
                res.send(err);
            console.log(game)
            res.json(game);
        })
    })
    .put(function(req, res) {
        console.log("Got Edit Request for game name")
        // use our game model to find the game we want
        gameModel.findById(req.params.game_id, function(err, game) {

            if (err)
                res.send(err);
            game.player_Name = req.body.player_Name;
            game.associated_player = req.body.associated_player;
            game.game_Date = req.body.game_Date;
            game.minutes_played = req.body.minutes_played;
            game.FGM = req.body.FGM;
            game.FGA = req.body.FGA;
            game.threes_made = req.body.threes_made;
            game.threes_attempted = req.body.threes_attempted;
            game.FTM = req.body.FTM;
            game.FTA = req.body.FTA;
            game.ORB = req.body.ORB;
            game.DRB = req.body.DRB;
            game.AST = req.body.AST;
            game.STL = req.body.STL;
            game.BLK = req.body.BLK;
            game.TOV = req.body.TOV;
            game.Fouls = req.body.Fouls;
            game.PTS = req.body.PTS;
            game.plusMinus = req.body.plusMinus;

            console.log('Edited the game name: ');
            console.log(game);
            // save the game
            game.save(function(err) {
                if (err)
                    res.send(err);
                console.log(game);
                res.json({ message: 'game updated!' });
            });

        });
    })

    .delete(function(req, res) {
        console.log('Delete Request Recieved');
        console.log('Removing '+ req.params.game_id);
        gameModel.remove({
            _id: req.params.game_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
        console.log('game Deleted');
    });

router.route('/saveFantasyTeam')
    .post(function(req, res) {
        console.log('Got Save Request');
        console.log(req.body);
        var newFantasyTeam = new fantasyModel();

        newFantasyTeam.team_name = req.body.fantasyTeamName;
        newFantasyTeam.owner = req.body.userID;
        newFantasyTeam.roster = req.body.roster;

        console.log('New Team: ');
        console.log(newFantasyTeam);

        // save the new game and check for errors
        newFantasyTeam.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'New game created!' });
        });


    });

router.route('/fantasyTeam/:user_id')
    .get(function(req, res) {
        console.log('Got Request to find fantasy Team for user: ' + req.params.user_id);
        fantasyModel.find({owner: req.params.user_id}, function(err, teams) {
            if (err)
                res.send(err);
            console.log(teams);
            res.json(teams);
        })

});


module.exports = router;