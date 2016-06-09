/**
 * @file Angular Javascript file that handles reading NBA List
 * @namespace Read Roster(Players) Angular App
 * @version 1.0
 */
var app = angular.module('readTeamsEngine', ['ngMaterial']);

app.controller('readTeamsController', ['$scope', '$http',
    function($scope, $http) {
        $scope.test = 'test';

            $http.get('/api/team').success(function(response){
                //Store DB as variable $scope.currentTeams
                $scope.currentTeams = response;
            });

    }
]);