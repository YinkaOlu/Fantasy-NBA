/**
 * Created by Yinka on 2015-12-06.
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