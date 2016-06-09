/**
 * @file Angular Javascript file that handles Create team Interactions.
 * @namespace Create Team Angular App
 * @version 1.0
 */


var app = angular.module('createTeamEngine', ['ngMaterial']);

app.controller('createTeamController', ['$scope', '$http',
    function($scope, $http) {

        /**
         * @memberof Create Team Angular App
         * @type {{object}} Holds temporary team object before saving to Database
         */
        $scope.team = {};

        /**
         * @memberof Create Team Angular App
         * @description HTTP Call to save team to database
         */
        $scope.createTeam = function(){
            $http.post('/api/team', $scope.team);
            window.location.href=window.location.href;
        };
	
	}
]);