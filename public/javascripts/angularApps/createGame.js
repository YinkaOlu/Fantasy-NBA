/**
 * @file Angular Javascript file that handles Create Game Interactions.
 * @namespace Create Game Angular App
 * @version 1.0
 */
var app = angular.module('createGameEngine', ['ngMaterial']);

app.controller('createGameController', ['$scope', '$http',
    function($scope, $http) {

        /**
         * @memberof Create Game Angular App
         * @description Empty Object that will eventually hold the created game
         * @typeOf {Game Object}
         */
        $scope.game = {};
        var tempDate = Date.now();
        $scope.tempDate = new Date(tempDate);

        /**
         * @memberof Create Game Angular App
         * @description Makes HTTP Call to retrieve all NBA Teams. Store List in $scope.currentTeams
         */
        $http.get('/api/team').success(function(response) {
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        /**
         * @memberof Create Game Angular App
         * @description Makes HTTP Call to retrieve Team roster of team selected by user
         */
        $scope.selectTeamFunction = function() {
            for(var i = 0; i <$scope.currentTeams.length; i++){
                if($scope.selectedTeam == $scope.currentTeams[i].team_name){
                    $scope.selectedTeam = $scope.currentTeams[i]
                }
            }

            $scope.teamID = $scope.selectedTeam._id;
            console.log($scope.teamID);
            console.log($scope.selectedTeam.team_name);
            var teamURL = '/api/findRoster/' + $scope.teamID;
            $http.get(teamURL).success(function(response) {
                $scope.roster = response;
                $scope.player = $scope.roster[0];
            });
        };

        /**
         * @memberof Create Game Angular App
         * @description Stores selected player and calls checkMatch() for further verification
         * @param playerPos {number} Position of Player in Roster Array
         */
        $scope.selectPlayerFunction = function(playerPos) {
            $scope.player = $scope.roster[playerPos];
            $scope.game.associated_player = $scope.player._id;
            console.log('Selected Player: ' + $scope.player.player_first_name + ' ' + $scope.player.player_last_name);
            //Check if CSV matches Player
            checkMatch();
        };

        //------------------------------------------------------------
        //-------------------------------------------------------------
        //---------------CSV Manipulation-----------------------------
        //-------------------------------------------------------------

        /**
         * @memberof Create Game Angular App
         * @description Verifies that user selected player matches the player from CSV game input
         */
        var checkMatch = function() {
            $scope.matchValue = false;
            console.log('[checkMatch Function]Game Player: ' + $scope.game.player_Name);
            console.log('[checkMatch Function]Selected Player: ' + $scope.player.player_first_name + ' ' + $scope.player.player_last_name);

            if ($scope.game.player_Name == ($scope.player.player_first_name + ' ' + $scope.player.player_last_name))
                $scope.matchValue = true;
            else
                $scope.matchValue = false;

            console.log("[checkMatch Function]Match Status: " + $scope.matchValue);
        };

        /**
         * @memberof Create Game Angular App
         * @description Will hold the input CSV
         * @type {string}
         */
        $scope.inputCSV = '';


        /**
         * @memberof Create Game Angular App
         * @description Split CSV by (,) into Array. Each element in array is an stat for particular player. Store Split CSV into choppedCSV
         */
        var CSVChop = function() {
            console.log("[CSVChop Function]This is the CSV you entered:\n" + $scope.inputCSV);
            var choppedCSV = $scope.inputCSV;
            choppedCSV = choppedCSV.split(',');
            console.log('[CSVChop Function]Chopped CSV');
            console.log('[CSVChop Function]CSV Entered for: ' + choppedCSV[0]);
            //Assign Values to Game Object using CSVFunction
            if (choppedCSV[0] != 'Reserves') {
                CSVFunction(choppedCSV);
                //Check if CSV matches Player
                checkMatch();
                console.log('[CSVChop Function]Player from Game: ' + $scope.game.player_Name);
            } else {
                console.log('*/*/*/ Ran into a Reserve Heading');
            }
        };


        //CSV Function to grab data from text
        /**
         *@memberof Create Game Angular App
         * @param {object}dividedCSV Array Containing row of input CSV
         * @description Takes a row from the CSV and store each element as attribute
         */
        var CSVFunction = function(dividedCSV) {
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

        /**
         * @memberof Create Game Angular App
         * @description Makes HTTP Call to create new Game with $scope.game variable
         */
        $scope.createGame = function() {
            console.log('****************Exporting Game*************** ');
            console.log('Exporting Game to: ' + $scope.game.associated_player + ' ' + $scope.game.player_Name);
            $http.post('/api/game', $scope.game);

            $scope.game = {};
        };

        /**
         * @memberof Create Game Angular App
         * @description Used for CSV with more than row. Divides CSV and stores into CSVStorage Array. Each element in array is one row equivalent to stat of one player.
         */
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
                CSVChop();

                //Check if Player from CSV is in selected Roster
                for (var m = 0; m < $scope.roster.length; m++) {
                    //Temperarily hold player in roster
                    $scope.player = $scope.roster[m];
                    console.log('Place in roster: ' + m + '. Player is: ' + $scope.player.player_first_name + ' ' + $scope.player.player_last_name);
                    console.log('Compared with player from CSV: ' + $scope.game.player_Name);
                    //Check if CSV player matches a player in roster
                    checkMatch();

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