/**
 * Created by yinka_000 on 2015-11-14.
 */
var app = angular.module('editGameApp',[]);

app.controller('editGameController', ['$scope', '$http',


    function($scope, $http){

        //Blank game
        var currentDate = Date();
        $scope.game = {};
        $scope.oldGame = {};
        var oldGame = {};

        //DB Call to currentNBA, Retrieve DB Content
        $http.get('/currentNBAdb').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
            $scope.numOfTeams = response.length;


        });

        $scope.selectTeamFunction = function(teamPos){
            selectedTeam = $scope.currentTeams[teamPos];
            $scope.choosenTeamRoster = selectedTeam.roster;
            $scope.game.teamName = selectedTeam.team_name;

        };

        $scope.selectedPlayer = function(playerPos){
            var currentSeasonGames = $scope.choosenTeamRoster[playerPos].currentSeasonGames;
            $scope.currentSeasonGames = currentSeasonGames;


            choosenPlayerName = $scope.choosenTeamRoster[playerPos].player_name;
            $scope.game.playerName = choosenPlayerName;
        };

        $scope.selectedGame = function(gamePos){
            oldGame = $scope.currentSeasonGames[gamePos];
            console.log('Initial Stored Game');
            console.log(oldGame);

            $scope.game = oldGame;
            $scope.game.playerName = choosenPlayerName;
            $scope.game.teamName = selectedTeam.team_name;
            $http.post('/removeGameDB', $scope.game);

        };



        $scope.editGameInDB = function(){
            $scope.editedGame = $scope.game;
            console.log("temp game");
            console.log($scope.game);

            console.log("old game");
            console.log(oldGame);

            console.log('Resetting forms');
            document.forms["myForm"].reset();
            document.forms["myForm2"].reset();
            document.forms["myForm3"].reset();
            document.forms["myForm4"].reset();

            console.log("Edited game");
            console.log($scope.editedGame);

            console.log('Sending HTTP Request to add edited game game');
            $http.post('/addGameDB', $scope.game);


            alert("Finished Submission");
            $scope.choosenTeamRoster = [];
            $scope.game = {};
            $scope.editedGame = {};
        };


    }
]);