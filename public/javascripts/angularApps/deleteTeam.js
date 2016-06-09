/**
 * @file Angular Javascript file that handles Team Deletion
 * @namespace Delete Team Angular App
 * @version 1.0
 */
var app = angular.module('deleteTeamEngine', ['ngMaterial']);

app.controller('deleteTeamController', ['$scope', '$http',
    function($scope, $http) {
        $scope.test = 'test';

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });
        $scope.team = {};

        /**
         * @description Assigns selectedTeam variable to team @teamPos index in $scope.currentTeams (NBA Team List)
         * @memberof Delete Team Angular App
         * @param teamPos {number} Position of Team in NBA team list array $scope.currentTeams
         */
        $scope.selectTeamFunction = function(teamPos){
            $scope.team = $scope.currentTeams[teamPos];
        };

        /**
         * @memberof Delete Team Angular App
         * @description Assigns temporary team variable equal to selected team. Makes HTTP post request to delete team
         */
        $scope.deleteTeam = function(){
            confirm('Delete: ' +$scope.team.team_name + '?');
            var updateTeamURL = '/api/team/' + $scope.team._id;
            $http.delete(updateTeamURL);
            window.location.href=window.location.href;
        }

    }
]);