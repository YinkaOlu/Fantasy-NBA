/**
 * Created by yolu on 12/31/2015.
 */
var app = angular.module('playerStatApp',[]);

app.controller('playerStatCtrl', ['$scope', '$http',
    function($scope, $http){
        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        $scope.hideResults = true;

        $scope.selectTeamFunction = function(teamPos) {
            $scope.selectedTeam = $scope.currentTeams[teamPos];
            $scope.teamID = $scope.currentTeams[teamPos]._id;
            console.log($scope.teamID);
            console.log($scope.selectedTeam.team_name);
            var teamURL = '/api/findRoster/' + $scope.teamID;
            $http.get(teamURL).success(function(response){
                $scope.roster = response;
            });
        };

        $scope.selectPlayerFunction = function(playerPos){
            $scope.player = $scope.roster[playerPos];
            $scope.playerID = $scope.player._id;
            console.log($scope.playerID);
            console.log($scope.player.player_first_name);
            var playerURL = '/api/findGames/' + $scope.playerID;
            $http.get(playerURL).success(function(response) {
                $scope.gamesPlayed = response;
            })
        };

        $scope.displayResults = function(){

            //Get All Games played by player
            $scope.playerID = $scope.player._id;
            console.log($scope.playerID);
            console.log($scope.player.player_first_name);
            var playerURL = '/api/findGames/' + $scope.playerID;
            $http.get(playerURL).success(function(response) {
                $scope.gamesPlayed = response;
            });
            //Calculate Season Stats
            $scope.seasonStats();

            // Build Charts
            $scope.buildGraphs();
            //Display Results
            $scope.hideResults = false;
        };

        $scope.seasonStats = function(){
            $scope.PPG = 0;
            $scope.APG = 0;
            $scope.FGPer = 0;
            $scope.BPG = 0;
            $scope.threePPer = 0;
            $scope.FTPer = 0;
            $scope.RPG = 0;
            $scope.TOV = 0;
            $scope.Fouls = 0;
            $scope.plusMinus = 0;
            $scope.MPG = 0;
            $scope.Steals = 0;

            $scope.FGM = 0;
            $scope.FGA = 0;

            $scope.TPA = 0;
            $scope.TPM = 0;

            $scope.FTA = 0;
            $scope.FTM = 0;


            var gamesPlayed = $scope.gamesPlayed.length;

            console.log(gamesPlayed);

            for (var i = 0; i < gamesPlayed; i++){
                $scope.PPG += $scope.gamesPlayed[i].PTS;
                $scope.APG += $scope.gamesPlayed[i].AST;
                $scope.RPG += ($scope.gamesPlayed[i].ORB + $scope.gamesPlayed[i].DRB);
                $scope.TOV += ($scope.gamesPlayed[i].TOV);
                $scope.Fouls += $scope.gamesPlayed[i].Fouls;
                $scope.BPG += $scope.gamesPlayed[i].BLK;
                $scope.plusMinus += $scope.gamesPlayed[i].plusMinus;
                $scope.MPG += $scope.gamesPlayed[i].minutes_played;
                $scope.Steals += $scope.gamesPlayed[i].STL;


                    $scope.FGM += ($scope.gamesPlayed[i].FGM);
                    $scope.FGA += ($scope.gamesPlayed[i].FGA);

                    $scope.TPA += ($scope.gamesPlayed[i].threes_attempted);
                    $scope.TPM += ($scope.gamesPlayed[i].threes_made);


                    $scope.FTA += ($scope.gamesPlayed[i].FTA);
                    $scope.FTM += ($scope.gamesPlayed[i].FTM);


            }

            $scope.PPG = ($scope.PPG / gamesPlayed);
            $scope.APG = ($scope.APG / gamesPlayed);
            $scope.RPG = ($scope.RPG / gamesPlayed);
            $scope.TOV = ($scope.TOV / gamesPlayed);
            $scope.Fouls = ($scope.Fouls / gamesPlayed);
            $scope.BPG = ($scope.BPG / gamesPlayed);
            $scope.plusMinus = ($scope.plusMinus / gamesPlayed);
            $scope.MPG = ($scope.MPG / gamesPlayed);
            $scope.Steals = ($scope.Steals / gamesPlayed);

            $scope.FGPer = ($scope.FGM / $scope.FGA);
            $scope.threePPer = ($scope.TPM / $scope.TPA);
            $scope.FTPer = ($scope.FTM / $scope.FTA);

        };

        $scope.buildGraphs = function(){

        };


    }]);