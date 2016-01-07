/**
 * Created by yinka_000 on 2016-01-05.
 */
var app = angular.module('profilePageManager',[]);

app.controller('profilePageManager', ['$scope', '$http',
    function($scope, $http) {
        $scope.hideFantasyRoster = true;

        //HTTP Call , Retrieve User ID
        $http.get('/fantasyTeam/userID').success(function(response) {
            //Store DB as variable $scope.currentTeams
             var currentUserID = response;

            var url = '/api/fantasyTeam/'+ currentUserID;

            $http.get(url).success(function(response) {
                //Store DB as variable $scope.currentTeams
                $scope.userTeams = response;
                $scope.fantasyRosters = $scope.userTeams.roster;
                console.log('Finished Retrieval');
            });
        });

        $scope.viewRoster = function(teamNum){
            //Reset
            $scope.selectedTeam = {};
            $scope.selectedRoster = {};
            $scope.hideFantasyRoster = true;
            // Implement

            $scope.selectedTeam = $scope.userTeams[teamNum];
                $scope.selectedRoster = $scope.selectedTeam.roster;
                $scope.hideFantasyRoster = false;

        }





    }]);