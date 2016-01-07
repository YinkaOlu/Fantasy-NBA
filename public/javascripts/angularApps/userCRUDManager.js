/**
 * Created by yinka_000 on 2016-01-06.
 */
var app = angular.module('userCRUDApp',[]);

app.controller('userCRUDApp', ['$scope', '$http',
    function($scope, $http) {

        $scope.newUser = {};
        $scope.newUser.username = 'username';
        $scope.newUser.email = 'email';
        $scope.newUser.password = 'password';
        $scope.newUser.role = 'role';

        $http.get('/api/user').success(function(response) {
            //Store DB as variable $scope.currentTeams
            $scope.users = response;
            console.log('Finished Retrieval');
        });

        $scope.deleteUser = function(userNum){
            var userID = $scope.users[userNum]._id;
            var deleteUserURL = '/api/user/' + userID;
            alert(deleteUserURL);
            $http.delete(deleteUserURL);

            window.location.href=window.location.href;
        };

        $scope.updateUser = function(userNum){
            var userID = $scope.users[userNum]._id;
            var updateUserURL = '/api/user/' + userID;
            alert(updateUserURL);
            $http.put(updateUserURL, $scope.users[userNum]);

            window.location.href=window.location.href;
        };

        $scope.createUser = function(){
            console.log('****************Creating User*************** ');
             $http.post('/api/user', $scope.newUser);

            window.location.href=window.location.href;
        };
    }]);