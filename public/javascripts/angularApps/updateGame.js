/**
 * updated by yinka_000 on 2015-12-07.
 */
var app = angular.module('updateGameEngine', ['ngMaterial']);

app.controller('updateGameController', ['$scope', '$http',
    function($scope, $http) {

        $scope.game = {};

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

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

        $scope.selectGameFunction = function(GamePos){
            $scope.game = $scope.gamesPlayed[GamePos];
        };

        $scope.updateGame = function(){
            confirm('Update Game?');
            var updatePlayerURL = '/api/game/' + $scope.game._id;
            alert(updatePlayerURL);
            $http.put(updatePlayerURL, $scope.game);
            window.location.href=window.location.href;
        };
    }
]);