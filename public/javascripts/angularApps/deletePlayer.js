/**
 * @file Angular Javascript file that handles Player Deletion
 * @namespace Delete Player Angular App
 * @version 1.0
 */
var app = angular.module('deletePlayerEngine', ['ngMaterial']);

app.controller('deletePlayerController', ['$scope', '$http',
    function($scope, $http) {
        $scope.test = 'test';

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        /**
         * @description Assigns selectedTeam variable to team @teamPos index in $scope.currentTeams (NBA Team List)
         * @memberof Delete Player Angular App
         * @param teamPos {number} Position of Team in NBA team list array $scope.currentTeams
         */
        $scope.selectTeamFunction = function(teamPos) {
            $scope.selectedTeam = $scope.currentTeams[teamPos];
            $scope.teamID = $scope.currentTeams[teamPos]._id;
            console.log($scope.teamID);
            console.log($scope.selectedTeam.team_name);
            var teamURL = '/api/findRoster/' + $scope.teamID;
            $http.get(teamURL).success(function(response){
                $scope.roster = response;
				console.log("Response is:" + response[0].player_first_name);
            });

        };
        /**
         * @description Assigns player variable to player @playerPos index in $scope.roster (Roster of Selected Team)
         * @memberof Delete Player Angular App
         * @param playerPos {number} Position of Team in NBA team list array $scope.currentTeams
         */
		$scope.selectPlayerFunction = function(playerPos){
            $scope.player = $scope.roster[playerPos]
        };

        /**
         * @memberof Delete Player Angular App
         * @description Assigns temporary player variable equal to selected player. Makes HTTP post request to save new player
         */
        $scope.deletePlayer = function(){
            confirm('Delete: ' +$scope.player.player_first_name + '?');
            var deletePlayerURL = '/api/player/' + $scope.player._id;
            $http.delete(deletePlayerURL);
            window.location.href=window.location.href;
        }

    }
]);