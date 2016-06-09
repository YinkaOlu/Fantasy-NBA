/**
 * @file Angular Javascript file that handles Game Editing/Updates
 * @namespace Update Game Angular App
 * @version 1.0
 */

var app = angular.module('updateGameEngine', ['ngMaterial']);

app.controller('updateGameController', ['$scope', '$http',
    function($scope, $http) {

        $scope.game = {};

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        /**
         * @memberof Update Game Angular App
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
         * @memberof Update Game Angular App
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
         * @memberof Update Game Angular App
         * @description Stores selected game
         * @param GamePos {number} Position of Player in Roster Array
         */
        $scope.selectGameFunction = function(GamePos){
            $scope.game = $scope.gamesPlayed[GamePos];
        };

        /**
         * @memberof Update Game Angular App
         * @description Makes HTTP call to update game
         */
        $scope.updateGame = function(){
            confirm('Update Game?');
            var updatePlayerURL = '/api/game/' + $scope.game._id;
            alert(updatePlayerURL);
            $http.put(updatePlayerURL, $scope.game);
            window.location.href=window.location.href;
        };
    }
]);