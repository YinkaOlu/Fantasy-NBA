/**
 * Created by yinka_000 on 2015-12-06.
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
        $scope.selectTeamFunction = function(teamPos){
            $scope.team = $scope.currentTeams[teamPos];
        }

        $scope.deleteTeam = function(){
            confirm('Delete: ' +$scope.team.team_name + '?');
            var updateTeamURL = '/api/team/' + $scope.team._id;
            $http.delete(updateTeamURL);
            window.location.href=window.location.href;
        }

    }
]);