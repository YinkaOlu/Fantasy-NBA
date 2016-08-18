/**
 * @file Angular Javascript file that handles Create Player Interactions.
 * @namespace Create Player Angular App
 * @version 1.0
 */
var app = angular.module('createPlayerEngine', ['ngMaterial']);

app.controller('createPlayerController', ['$scope', '$http',
    function($scope, $http) {

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        /**
         * @summary Holds the temperary player before saving to database
         * @memberof Create Player Angular App
         * @type {{object}}
         */
        $scope.player = {};

        /**
         * @description Assigns selectedTeam variable to team @teamPos index in $scope.currentTeams (NBA Team List)
         * @memberof Create Player Angular App
         * @param teamPos {number} Position of Team in NBA team list array $scope.currentTeams
         */
        $scope.selectTeamFunction = function(teamPos){
            $scope.team = $scope.currentTeams[teamPos];
            var teamID= $scope.currentTeams[teamPos]._id;
            //$scope.player.player_team = teamID;
        };


        /**
         * @memberof Create Player Angular App
         * @description Assigns temporary player variable equal to selected player. Makes HTTP post request to save new player
         */
        $scope.createPlayer = function(){
            // confirm('Add '+ $scope.player.player_first_name + $scope.player.player_last_name + ' to '+ $scope.team.team_name);
            $http.post('/api/player', $scope.player);
            window.location.href=window.location.href;
        };
	}
]);