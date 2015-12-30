

var app = angular.module('updatePlayerEngine', []);
app.controller('updatePlayerController', ['$scope', '$http',
    function($scope, $http) {

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        $scope.player = {};

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
            $scope.player = $scope.roster[playerPos]
        }


        $scope.updatePlayer = function(){
            confirm('Update player?');
            var updateTeamURL = '/api/player/' + $scope.player._id;
            alert(updateTeamURL);
            $http.put(updateTeamURL, $scope.player);
            window.location.href=window.location.href;
        };
		
		$scope.destinationTeamFunction = function(teamPos){
			$scope.destinationTeam = $scope.currentTeams[teamPos];
            $scope.destinationTeamID = $scope.currentTeams[teamPos]._id;
            console.log($scope.destinationTeamID);
            console.log($scope.destinationTeam.team_name);
		};
		
		$scope.tradePlayer = function(){
			$scope.player.player_team = $scope.destinationTeamID;
			confirm("Trade "+ $scope.player.player_first_name + " "+ $scope.player.player_last_name+ " to: " + $scope.destinationTeam.team_name);
			var updateTeamURL = '/api/player/' + $scope.player._id;
            alert(updateTeamURL);
            $http.put(updateTeamURL, $scope.player);
            window.location.href=window.location.href;
		};
    }
]);