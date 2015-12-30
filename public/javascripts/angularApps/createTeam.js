/**
 * Created by Yinka on 2015-12-03.
 */


var app = angular.module('createTeamEngine', []);

app.controller('createTeamController', ['$scope', '$http',
    function($scope, $http) {

        $scope.team = {};

        $scope.createTeam = function(){
            $http.post('/api/team', $scope.team);
            window.location.href=window.location.href;
        };
	
	}
]);