/**
 * @file Angular Javascript file that handles Create Player Interactions.
 * @namespace Read Roster(Players) Angular App
 * @version 1.0
 */
var app = angular.module('readPlayersEngine', ['ngMaterial']);

app.controller('readPlayersController', ['$scope', '$http',
    function($scope, $http) {
        $scope.test = 'test';

            $http.get('/api/team').success(function(response){
                //Store DB as variable $scope.currentTeams
                $scope.currentTeams = response;
            });

        /**
         * @description Assigns selectedTeam variable to team @teamPos index in $scope.currentTeams (NBA Team List)
         * @memberof Read Roster(Players) Angular App
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

    }
]);