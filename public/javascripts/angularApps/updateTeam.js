/**
 * Created by yinka_000 on 2015-12-06.
 */
var app = angular.module('updateTeamsEngine', []);

app.controller('updateTeamsController', ['$scope', '$http',
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

        $scope.updateTeam = function(){
            alert('update button pressed');
            var updateTeamURL = '/api/team/' + $scope.team._id;
            alert(updateTeamURL);
            $http.put(updateTeamURL, $scope.team);
            window.location.href=window.location.href;
        }

    }
]);