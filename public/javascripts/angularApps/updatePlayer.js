/**
 * @file Angular Javascript file that handles Player Editing/Updates
 * @namespace Update Player Angular App
 * @version 1.0
 */

var app = angular.module('updatePlayerEngine', ['ngMaterial']);
app.controller('updatePlayerController', ['$scope', '$http',
    function($scope, $http) {

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        $scope.player = {};

        /**
         * @description Assigns selectedTeam variable to team @teamPos index in $scope.currentTeams (NBA Team List)
         * @memberof Update Player Angular App
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
            });

        };

        /**
         * @description Assigns player variable to player @playerPos index in $scope.roster (Roster of Selected Team)
         * @memberof Update Player Angular App
         * @param playerPos {number} Position of Team in NBA team list array $scope.currentTeams
         */
        $scope.selectPlayerFunction = function(playerPos){
            $scope.player = $scope.roster[playerPos]
        }


        /**
         * @memberof Update Player Angular App
         * @description Assigns temporary player variable equal to selected player. Makes HTTP post request to save updated player
         */
        $scope.updatePlayer = function(){
            confirm('Update player?');
            var updateTeamURL = '/api/player/' + $scope.player._id;
            alert(updateTeamURL);
            $http.put(updateTeamURL, $scope.player);
            window.location.href=window.location.href;
        };

        /**
         * @memberof Update Player Angular App
         * @description Assign the destination team to new selected team
         * @param teamPos {number} index of selected team
         */
		$scope.destinationTeamFunction = function(teamPos){
			$scope.destinationTeam = $scope.currentTeams[teamPos];
            $scope.destinationTeamID = $scope.currentTeams[teamPos]._id;
            console.log($scope.destinationTeamID);
            console.log($scope.destinationTeam.team_name);
		};

        /**
         * @description Assigns player's team attributed to destination team. Makes HTTP call to save to database
         * @memberof Update Player Angular App
         */
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