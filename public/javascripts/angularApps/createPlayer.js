/**
 * Created by Yinka on 2015-12-03.
 */


var app = angular.module('createPlayerEngine', ['ngMaterial']);

app.controller('createPlayerController', ['$scope', '$http',
    function($scope, $http) {

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        $scope.player = {};

        $scope.selectTeamFunction = function(teamPos){
            $scope.team = $scope.currentTeams[teamPos];
            var teamID= $scope.currentTeams[teamPos]._id;
            $scope.player.player_team = teamID;
        };


        $scope.createPlayer = function(){
            confirm('Add '+ $scope.player.player_first_name + $scope.player.player_last_name + ' to '+ $scope.team.team_name);
            $http.post('/api/player', $scope.player);
            window.location.href=window.location.href;
        };
	}
]);