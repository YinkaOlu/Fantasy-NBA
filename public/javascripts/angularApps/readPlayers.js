/**
 * Created by Yinka on 2015-12-06.
 */
var app = angular.module('readPlayersEngine', ['ngMaterial']);

app.controller('readPlayersController', ['$scope', '$http',
    function($scope, $http) {
        $scope.test = 'test';

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
				console.log("Response is:" + response[0].player_first_name);
            });

        };

    }
]);