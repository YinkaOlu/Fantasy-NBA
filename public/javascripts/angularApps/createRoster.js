/**
 * Created by yinka_000 on 2016-08-16.
 */
/**
 * @file Angular Javascript file that handles Create Player Interactions.
 * @namespace Create Player Angular App
 * @version 1.0
 */
var app = angular.module('createRosterEngine', ['ngMaterial']);

app.controller('createRosterController', ['$scope', '$http',
    function($scope, $http) {

        $http.get('/api/team').success(function (response) {
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        $scope.roster = [];

        /**
         * @description Assigns selectedTeam variable to team @teamPos index in $scope.currentTeams (NBA Team List)
         * @memberof Create Player Angular App
         * @param teamPos {number} Position of Team in NBA team list array $scope.currentTeams
         */
        $scope.selectTeamFunction = function(teamPos){
            $scope.team = $scope.currentTeams[teamPos];
            var teamID= $scope.currentTeams[teamPos]._id;
            $scope.roster.roster_team = teamID;
            alert(teamID)
        };

        $scope.searchPlayer = function (playerName, rosterPos) {
            var names =playerName.split(" ");
            var firstName = names[0]
            var lastName = names[1];
            $http.get('/api/findPlayerByName/'+firstName+"/"+lastName)
                .success(function (response) {
                    console.log("Found the player");
                    console.log(response);
                    switch (rosterPos){
                        case 0:
                            console.log("Player One");
                            $scope.roster.playerOne = response[0];
                            console.log($scope.roster.playerOne.player_first_name);
                            break;
                        case 1:
                            $scope.roster.playerTwo = response[0];
                            console.log(roster.playerTwo);
                            console.log("Player Two");
                            console.log($scope.roster.playerTwo.player_first_name);
                            break;
                        case 2:
                            $scope.roster.playerThree = response[0];
                            console.log(roster.playerThree);
                            console.log("Player Three");
                            console.log($scope.roster.playerThree.player_first_name);
                            break;
                        case 3:
                            $scope.roster.playerFour = response[0];
                            console.log(roster.playerFour);
                            console.log("Player Two");
                            console.log($scope.roster.playerFour.player_first_name);
                            break;
                        case 4:
                            $scope.roster.playerFive = response[0];
                            console.log(roster.playerFive);
                            console.log("Player Two");
                            console.log($scope.roster.playerFive.player_first_name);
                            break;
                        case 5:
                            $scope.roster.playerSix = response[0];
                            console.log(roster.playerSix);
                            console.log("Player Two");
                            console.log($scope.roster.playerSix.player_first_name);
                            break;
                        case 6:
                            $scope.roster.playerSeven = response[0];
                            console.log(roster.playerSeven);
                            console.log("Player Two");
                            console.log($scope.roster.playerSeven.player_first_name);
                            break;
                        case 7:
                            $scope.roster.playerEight = response[0];
                            console.log(roster.playerEight);
                            console.log("Player Two");
                            console.log($scope.roster.playerEight.player_first_name);
                            break;
                        case 8:
                            $scope.roster.playerNine = response[0];
                            console.log(roster.playerNine);
                            console.log("Player Two");
                            console.log($scope.roster.playerNine.player_first_name);
                            break;
                        case 9:
                            $scope.roster.playerTen = response[0];
                            console.log(roster.playerTen);
                            console.log("Player Two");
                            console.log($scope.roster.playerTen.player_first_name);
                            break;
                        case 10:
                            $scope.roster.playerEleven = response[0];
                            console.log(roster.playerEleven);
                            console.log("Player Two");
                            console.log($scope.roster.playerEleven.player_first_name);
                            break;
                        case 11:
                            $scope.roster.playerTwelve = response[0];
                            console.log(roster.playerTwelve);
                            console.log("Player Two");
                            console.log($scope.roster.playerTwelve.player_first_name);
                            break;
                        case 12:
                            $scope.roster.playerThirteen = response[0];
                            console.log(roster.playerThirteen);
                            console.log("Player Two");
                            console.log($scope.roster.playerThirteen.player_first_name);
                            break;
                        default:
                            console.log("Player One");
                            $scope.roster.playerOne = response[0];
                            console.log($scope.roster.playerOne.player_first_name);
                            break;
                    }
                });
        }

        $scope.createRoster = function () {
            console.log($scope.roster)
        }
    }
]);