/**
 * @file Angular Javascript file that handles Game deletion
 * @namespace Delete Game Angular App
 * @version 1.0
 */

var app = angular.module('deleteGameEngine', ['ngMaterial']);

app.controller('deleteGameController', ['$scope', '$http',
    function($scope, $http) {

        $scope.game = {};

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        /**
         * @memberof Delete Game Angular App
         * @description Makes HTTP Call to retrieve Team roster of team selected by user
         */
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

        /**
         * @memberof Delete Game Angular App
         * @description Stores selected player and makes HTTP to get all games played by player
         * @param playerPos {number} Position of Player in Roster Array
         */
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

        /**
         * @memberof Delete Game Angular App
         * @description Stores selected game 
         * @param GamePos {number} Position of Player in Roster Array
         */
        $scope.selectGameFunction = function(GamePos){
            $scope.game = $scope.gamesPlayed[GamePos];
            $scope.gameToDelete = $scope.game;

        };

        /**
         * @memberof Delete Game Angular App
         * @description Makes HTTP call to delete game
         */
        $scope.deleteGame = function(){
            alert($scope.gameToDelete._id);
            confirm('delete Game?');
            var deletePlayerURL = '/api/game/' + $scope.game._id;
            alert(deletePlayerURL);
            $http.delete(deletePlayerURL);

            window.location.href=window.location.href;
        };
    }
]);