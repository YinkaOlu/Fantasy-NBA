/**
 * Created by yinka_000 on 2015-12-07.
 */
var app = angular.module('createGameEngine', ['ngMaterial']);

app.controller('createGameController', ['$scope', '$http',
    function($scope, $http) {

        $scope.game = {};
        $scope.tempDate = Date.now();
        $scope.tempDate = new Date($scope.tempDate);

        $http.get('/api/team').success(function(response) {
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        $scope.selectTeamFunction = function(teamPos) {
            $scope.selectedTeam = $scope.currentTeams[teamPos];
            $scope.teamID = $scope.currentTeams[teamPos]._id;
            console.log($scope.teamID);
            console.log($scope.selectedTeam.team_name);
            var teamURL = '/api/findRoster/' + $scope.teamID;
            $http.get(teamURL).success(function(response) {
                $scope.roster = response;
            });

        };

        $scope.selectPlayerFunction = function(playerPos) {
            $scope.player = $scope.roster[playerPos];
            $scope.game.associated_player = $scope.player._id;
            console.log('Selected Player: ' + $scope.player.player_first_name + ' ' + $scope.player.player_last_name);
            //Check if CSV matches Player
            $scope.checkMatch();
        };

        //------------------------------------------------------------
        //-------------------------------------------------------------
        //---------------CSV Manipulation-----------------------------
        //-------------------------------------------------------------

        //Check Match Function
        $scope.checkMatch = function() {
            $scope.matchValue = false;
            console.log('[checkMatch Function]Game Player: ' + $scope.game.player_Name);
            console.log('[checkMatch Function]Selected Player: ' + $scope.player.player_first_name + ' ' + $scope.player.player_last_name);

            if ($scope.game.player_Name == ($scope.player.player_first_name + ' ' + $scope.player.player_last_name))
                $scope.matchValue = true;
            else
                $scope.matchValue = false;

            console.log("[checkMatch Function]Match Status: " + $scope.matchValue);
        }

        $scope.inputCSV = '';
        $scope.CSVChop = function() {
            console.log("[CSVChop Function]This is the CSV you entered:\n" + $scope.inputCSV);
            var choppedCSV = $scope.inputCSV;
            choppedCSV = choppedCSV.split(',');
            console.log('[CSVChop Function]Chopped CSV');
            console.log('[CSVChop Function]CSV Entered for: ' + choppedCSV[0]);
            //Assign Values to Game Object using CSVFunction
            if (choppedCSV[0] != 'Reserves') {
                $scope.CSVFunction(choppedCSV);
                //Check if CSV matches Player
                $scope.checkMatch();
                console.log('[CSVChop Function]Player from Game: ' + $scope.game.player_Name);
            } else {
                console.log('*/*/*/ Ran into a Reserve Heading');
            }




        };


        //CSV Function to grab data from text
        $scope.CSVFunction = function(dividedCSV) {
            var splitCSV = dividedCSV;
            $scope.game.player_Name = splitCSV[0];
            $scope.game.minutes_played = splitCSV[1];
            $scope.game.FGM = splitCSV[2];
            $scope.game.FGA = splitCSV[3];
            $scope.game.threes_made = splitCSV[5];
            $scope.game.threes_attempted = splitCSV[6];
            $scope.game.FTM = splitCSV[8];
            $scope.game.FTA = splitCSV[9];
            $scope.game.ORB = splitCSV[11];
            $scope.game.DRB = splitCSV[12];
            $scope.game.AST = splitCSV[14];
            $scope.game.STL = splitCSV[15];
            $scope.game.BLK = Number(splitCSV[16]);
            $scope.game.TOV = splitCSV[17];
            $scope.game.Fouls = splitCSV[18];
            $scope.game.PTS = splitCSV[19];
            $scope.game.plusMinus = splitCSV[20];

            //---------------------------------------
            //Convert input minutes played to number
            //---------------------------------------
            $scope.game.minutes_played = $scope.game.minutes_played.split(':');
            //if seconds less that 30, round down
            if (Number($scope.game.minutes_played[1]) < 30)
                $scope.game.minutes_played = $scope.game.minutes_played[0];
            //else round up 1 minute
            else
                $scope.game.minutes_played = Number($scope.game.minutes_played[0]) + 1;
            //----------------------------------------
            //----------------------------------------

            //Output game
            console.log('[CSVFunction Function]' + $scope.game.player_Name);
        };

        $scope.createGame = function() {
            console.log('****************Exporting Game*************** ');
            console.log('Exporting Game to: ' + $scope.game.associated_player + ' ' + $scope.game.player_Name);
            $http.post('/api/game', $scope.game);

            $scope.game = {};
        };

        $scope.multipleCSV = function() {
            console.log("[multipleCSV Function] This is the MultiCSV you entered:\n" + $scope.inputCSV);
            var multiCSV = $scope.inputCSV;
            multiCSV = multiCSV.split('\n');
            var CSVStorage = [];
            for (var i = 0; i < multiCSV.length; i++) {
                console.log('[multipleCSV Function] Game ' + i + ': ' + multiCSV[i]);
                CSVStorage.push(multiCSV[i]);
            }

            //List all stored games from CSV
            console.log('List all stored games from mutli-CSV');
            for (var n = 0; n < CSVStorage.length; n++) {
                console.log(n + '.');
                console.log(CSVStorage[n]);
                console.log('----------------------');
            }
            //Test what is in Stored CSV array
            for (var j = 0; j < CSVStorage.length; j++) {
                console.log('[multipleCSV Function] Store CSV #' + j + ': ' + CSVStorage[j]);

                //Store individual CSV into $scope.inputCSV
                $scope.inputCSV = CSVStorage[j];
                //Chop the CSV
                $scope.CSVChop();

                //Check if Player from CSV is in selected Roster
                for (var m = 0; m < $scope.roster.length; m++) {
                    //Temperarily hold player in roster
                    $scope.player = $scope.roster[m];
                    console.log('Place in roster: ' + m + '. Player is: ' + $scope.player.player_first_name + ' ' + $scope.player.player_last_name);
                    console.log('Compared with player from CSV: ' + $scope.game.player_Name);
                    //Check if CSV player matches a player in roster
                    $scope.checkMatch();

                    if ($scope.matchValue) {
                        console.log('******************************* [multipleCSV Function] Added Game to: ' + $scope.game.player_Name);
                        $scope.game.associated_player = $scope.player._id;
                        $scope.game.game_Date = $scope.tempDate;

                        $scope.createGame();
                    } else {
                        console.log(' [multipleCSV Function] No game for: ' + $scope.player.player_first_name + ' ' + $scope.player.player_last_name)
                    }



                }
            }
            window.location.href = window.location.href;
        };
    }
]);