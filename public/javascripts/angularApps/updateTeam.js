/**
 * @file Angular Javascript file that handles team Editing/updates
 * @namespace Update Team Angular App
 * @version 1.0
 */
var app = angular.module('updateTeamsEngine', ['ngMaterial']);

app.controller('updateTeamsController', ['$scope', '$http',
    function($scope, $http) {
        $scope.test = 'test';

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        $scope.team = {};

        /**
         * @description Assigns selectedTeam variable to team @teamPos index in $scope.currentTeams (NBA Team List)
         * @memberof Update Team Angular App
         * @param teamPos {number} Position of Team in NBA team list array $scope.currentTeams
         */
        $scope.selectTeamFunction = function(teamPos){
            $scope.team = $scope.currentTeams[teamPos];
        };

        /**
         * @memberof Update Team Angular App
         * @description Assigns temporary team variable equal to selected team. Makes HTTP post request to update team
         */
        $scope.updateTeam = function(){
            alert('update button pressed');
            var updateTeamURL = '/api/team/' + $scope.team._id;
            alert(updateTeamURL);
            $http.put(updateTeamURL, $scope.team);
            window.location.href=window.location.href;
        }

    }
]);