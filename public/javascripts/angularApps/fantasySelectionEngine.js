/**
 * Created by yolu on 12/29/2015.
 */
var app = angular.module('fantasySelectionEngine',[]);

app.controller('fantasySelectionEngine', ['$scope', '$http',
    function($scope, $http) {

        //HTTP Call to nba database, Retrieve team list
        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });
        //-------------------------------------------------
        //-------------------------------------------------

//---------------------------------------------------------
//-----------  SET DEFAULT SET-UP of FANTASY PAGE ---------
//---------------------------------------------------------

        //Set the default image of positions to default '+' sign image
        $scope.pointGuardImg = 'fantasyAssets/default';
        $scope.shootingGuardImg = 'fantasyAssets/default';
        $scope.smallForwardImg = 'fantasyAssets/default';
        $scope.powerForwardImg = 'fantasyAssets/default';
        $scope.centerImg = 'fantasyAssets/default';

        $scope.flexGuardImg = 'fantasyAssets/default';
        $scope.flexForwardImg = 'fantasyAssets/default';
        $scope.utilityOneImg = 'fantasyAssets/default';
        $scope.utilityTwoImg = 'fantasyAssets/default';
        $scope.utilityThreeImg = 'fantasyAssets/default';

        //Create Array to hold selected player of fantasy team
        $scope.fantasyRoster = ['','','','','','','','','',''];

        //Set default position selected to default
        $scope.currentPosition = 'default';

        //Array to store all potential div by their associated basketball position
        //Div has an assigned number, coresponds to position in Array
        $scope.positionList = ['pointGuard', 'shootingGuard', 'smallForward', 'powerForward', 'center', 'flexGuard', 'flexForward', 'utilityOne', 'utilityTwo', 'utilityThree'];

        //Hide Selection Form
        $scope.hideSelectionForm = true;

        //Start Date & End Date Holder
        $scope.startDate = null;
        $scope.endDate = null;

        $scope.playersOnFantasyTeam = 0;

        //Hide Stat Display
        $scope.hideStats = true;

        //Queried Game input Counter
        $scope.queriedGameCounter = 0;

//---------------------------------------------------------
//---------------  Position Selection Section  --------------
//---------------------------------------------------------
        //When Player Position spot selected, Run selectPosition

        $scope.selectPosition = function (selectedPos) {
            //selectedPos holds div number, which corresponds to div number, ie, 0 = pointGuard, 1 = shootingGuard

            var currentPosition = $scope.positionList[selectedPos];
            //reset $scope.currentPosition to selected Player position
            $scope.currentPosition = currentPosition;
            console.log('--------------\n You have selected DIV associated with: '+ $scope.currentPosition);

            //Show Selection Form
            $scope.hideSelectionForm = false;

            //Hide addPlayerBtn
            $scope.hideAddPlayerBtn = true;
        };

//---------------------------------------------------------
//---------------  Team / Filtered Roster Selection Section
//---------------------------------------------------------

        //Function to search selected team for needed basketball position
        //Activated when user clicks on team
        $scope.selectTeamFunction = function (teamNum) {
            console.log('Running selectTeamFunction...\n');
            //Array to hold players that meet player position credentials (is player a point guard, shooting guard etc.)
            $scope.roster=[];

                //Store selected team as '$scope.selectedTeam'
                $scope.selectedTeam = $scope.currentTeams[teamNum];

                //Store team unique id
                $scope.teamID = $scope.currentTeams[teamNum]._id;
                console.log($scope.teamID);
                console.log($scope.selectedTeam.team_name);
                //create teamURL which will hold url containing team id
                //Will be used for HTTP Get call for team roster

                var teamURL = '/api/findRoster/' + $scope.teamID;
                //HTTP Get call to retrieve roster of selected team, store in $scope.roster
                    $http.get(teamURL).success(function(response) {
                        $scope.roster = response;


                    //All players on selected team are now stored in $scope.roster
                    //$scope.allowedPlayers will hold players that meet position requirements
                    $scope.allowedPlayers = [];
                    var allowedPlayers = [];
                    console.log('Created allowedPlayers Array...');
                    //------------------Point Guard Sort -----------------------------
                    //-----------------------------------------------------------------

                        // if the selected Position is point Guard, sort roster for position: Point Guard
                        if (($scope.currentPosition == 'pointGuard')) {
                            console.log('Filter for Point Guards....');
                            var j = 0;
                            //Cycle through roster ($scope.roster)
                            for (var i = 0; i < $scope.roster.length; i++) {
                                //Check if player position exists for 'i'th player
                                if(($scope.roster[i].player_position) != null){
                                    //if player at position 'i' is equal to 'Point Guard', add to $scope.allowedPlayers
                                    if (($scope.roster[i].player_position).indexOf("Point Guard") > -1) {
                                        //Push player into allowedPlayers array
                                        allowedPlayers.push($scope.roster[i]);
                                        console.log(allowedPlayers[j].player_first_name +' '+allowedPlayers[j].player_last_name);
                                        j++;
                                    }
                                }
                            }
                            $scope.allowedPlayers = allowedPlayers;
                        }
                        //------------------Shooting Guard Sort -----------------------------
                        //-----------------------------------------------------------------

                        // Looking for shooting guards
                        else if (($scope.currentPosition == 'shootingGuard')) {
                            console.log('Filter for Shooting Guards....');
                            for (var i = 0; i < $scope.roster.length; i++) {
                                if(($scope.roster[i].player_position) != null) {
                                    if (((($scope.roster[i].player_position).indexOf("guard") != -1) || (($scope.roster[i].player_position).indexOf("Guard") != -1)) && (($scope.roster[i].player_position).indexOf("Point") == -1)) {
                                        allowedPlayers.push($scope.roster[i]);
                                    }
                                }
                            }
                            $scope.allowedPlayers = allowedPlayers;
                        }

                        //------------------Small Forward Sort -----------------------------
                        //-----------------------------------------------------------------

                        // Looking for small forwards
                        else if (($scope.currentPosition == 'smallForward')) {
                            console.log('Filter for Small Forwards....');
                            for (var i = 0; i < $scope.roster.length; i++) {
                                if(($scope.roster[i].player_position) != null) {
                                    if (((($scope.roster[i].player_position).indexOf("forward") != -1) || (($scope.roster[i].player_position).indexOf("Forward") != -1)) && (($scope.roster[i].player_position).indexOf("Small") > -1)) {
                                        allowedPlayers.push($scope.roster[i]);
                                    }
                                }
                            }
                            $scope.allowedPlayers = allowedPlayers;
                        }

                        //------------------Power Forward Sort -----------------------------
                        //-----------------------------------------------------------------

                        // Looking for power forwards
                        else if (($scope.currentPosition == 'powerForward')) {
                            console.log('Filter for Power Forwards....');
                            for (var i = 0; i < $scope.roster.length; i++) {
                                if(($scope.roster[i].player_position) != null) {
                                    if (((($scope.roster[i].player_position).indexOf("forward") != -1) || (($scope.roster[i].player_position).indexOf("Forward") != -1)) && (($scope.roster[i].player_position).indexOf("Power") > -1)) {
                                        allowedPlayers.push($scope.roster[i]);
                                    }
                                }
                            }
                            $scope.allowedPlayers = allowedPlayers;
                        }

                        //------------------ Center Sort -----------------------------
                        //-----------------------------------------------------------------

                        // Looking for Center
                        else if (($scope.currentPosition == 'center')) {
                            console.log('Filter for Centers....');
                            for (var i = 0; i < $scope.roster.length; i++) {
                                if(($scope.roster[i].player_position) != null) {
                                    if (((($scope.roster[i].player_position).indexOf("center") != -1) || (($scope.roster[i].player_position).indexOf("Center") != -1))) {
                                        allowedPlayers.push($scope.roster[i]);
                                    }
                                }
                            }
                            $scope.allowedPlayers = allowedPlayers;
                        }

                        //------------------Flex Guard Sort -----------------------------
                        //-------------------------------------------------

                        // Looking for flex guards
                        else if (($scope.currentPosition == 'flexGuard')) {
                            console.log('Filter for Point Guards +/or Shooting Guards....');
                            for (var i = 0; i < $scope.roster.length; i++) {
                                if(($scope.roster[i].player_position) != null) {
                                    if (((($scope.roster[i].player_position).indexOf("guard") != -1) || (($scope.roster[i].player_position).indexOf("Guard") != -1))) {
                                        allowedPlayers.push($scope.roster[i]);
                                    }
                                }
                            }
                            $scope.allowedPlayers = allowedPlayers;
                        }

                        //------------------Flex Forward Sort -----------------------------
                        //-------------------------------------------------

                        // Looking for flex forwards
                        else if (($scope.currentPosition == 'flexForward')) {
                            console.log('Filter for Small Forwards or Power Forwards....');
                            for (var i = 0; i < $scope.roster.length; i++) {
                                if(($scope.roster[i].player_position) != null) {
                                    if (((($scope.roster[i].player_position).indexOf("forward") != -1) || (($scope.roster[i].player_position).indexOf("Forward") != -1))) {
                                        allowedPlayers.push($scope.roster[i]);
                                    }
                                }
                            }
                            $scope.allowedPlayers = allowedPlayers;
                        }

                        //------------------ Utility Player  Sort -----------------------------
                        //-------------------------------------------------

                        // Looking for utility
                        else {
                            console.log('Selecting all Avaliable Players....');
                            $scope.allowedPlayers = $scope.roster;
                        }

                    })

        };

        //----------------------- End of selectTeamFunction -----------------------------------------

//------------------------ Addition of Player to Fantasy Roster --------------------------------
//----------------------------------------------------------------------------------------------

        $scope.assignPlayer = function (player) {
            $scope.assignedPlayer = player;
            $scope.hideAddPlayerBtn = false;
        };

        //----------- Add Player to Fantasy Roster ---------------
        $scope.addPlayer = function () {
            //Store input Player
            var playerToAdd = $scope.assignedPlayer;

            //If the selected position is Point Gaurd, add player to position 0 in fantasy Roster Array
            if ($scope.currentPosition == 'pointGuard') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.pointGuardImg = profileLocation;
                $scope.fantasyRoster[0] = playerToAdd;
            }

            //If the selected position is Shooting Guard, add player to position 0 in fantasy Roster Array
            else if ($scope.currentPosition == 'shootingGuard') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.shootingGuardImg = profileLocation;
                $scope.fantasyRoster[1] = playerToAdd;
            }
            //If the selected position is Small Forward, add player to position 0 in fantasy Roster Array
            else if ($scope.currentPosition == 'smallForward') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.smallForwardImg = profileLocation;
                $scope.fantasyRoster[2] = playerToAdd;
            }
            //If the selected position is Power Forward, add player to position 0 in fantasy Roster Array
            else if ($scope.currentPosition == 'powerForward') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.powerForwardImg = profileLocation;
                $scope.fantasyRoster[3] = playerToAdd;
            }
            //If the selected position is Center, add player to position 0 in fantasy Roster Array
            else if ($scope.currentPosition == 'center') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.centerImg = profileLocation;
                $scope.fantasyRoster[4] = playerToAdd;
            }
            //If the selected position is Flex Guard, add player to position 0 in fantasy Roster Array
            else if ($scope.currentPosition == 'flexGuard') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.flexGuardImg = profileLocation;
                $scope.fantasyRoster[5] = playerToAdd;
            }
            //If the selected position is Flex Forward, add player to position 0 in fantasy Roster Array
            else if ($scope.currentPosition == 'flexForward') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.flexForwardImg = profileLocation;
                $scope.fantasyRoster[6] = playerToAdd;
            }
            //If the selected position is Utility PLayer 1, add player to position 0 in fantasy Roster Array
            else if ($scope.currentPosition == 'utilityOne') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.utilityOneImg = profileLocation;
                $scope.fantasyRoster[7] = playerToAdd;
            }
            //If the selected position is Utility Player 2, add player to position 0 in fantasy Roster Array
            else if ($scope.currentPosition == 'utilityTwo') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.utilityTwoImg = profileLocation;
                $scope.fantasyRoster[8] = playerToAdd;
            }
            //If the selected position is Utility Player 3, add player to position 0 in fantasy Roster Array
            else if ($scope.currentPosition == 'utilityThree') {
                var profileLocation = '/profilePics/' + playerToAdd.player_first_name + ' '+ playerToAdd.player_last_name;
                $scope.utilityThreeImg = profileLocation;
                $scope.fantasyRoster[9] = playerToAdd;
            }
            //Add 1 to number of players on team ($scope.playersOnFantasyTeam)
            $scope.playersOnFantasyTeam++;

            //Hide Selection Form
            $scope.hideSelectionForm = true;
            console.log('End of player Addition function');
        };

        $scope.buildFantasyTeam = function(){

            if($scope.startDate == null || $scope.endDate == null) {
                if($scope.startDate == null)
                    console.log('Pick Start Date');
                else
                    console.log('Pick End Date')
            }

            //----------- Start of Stat Building
            else{

                console.log('Start Date: '+$scope.startDate+'\nEnd Date: '+ $scope.endDate);
                console.log('Building Fantasy Team......');

                $scope.playerQueryGames = [];

                $scope.reqGamesQuery = {};

                for(var i = 0; i<10; i++)
                //Add Games with in range into $scope.playerQueryGames, position in array corresponds to player position ie. 0 = point guard, 1 = shooting guard
                //Each position holds an array that contains games
                {
                        $scope.rangeGames = null;
                        $scope.reqGamesQuery.player_Name = $scope.fantasyRoster[i].player_first_name + ' ' + $scope.fantasyRoster[i].player_last_name;
                        $scope.reqGamesQuery.startDate = $scope.startDate;
                        $scope.reqGamesQuery.endDate = $scope.endDate;
                        $scope.reqGamesQuery.player_ID = $scope.fantasyRoster[i]._id;

                        var testURL = '/api/queryGameByDates/' + $scope.reqGamesQuery.player_ID + "/" + $scope.reqGamesQuery.player_Name + "/" + $scope.reqGamesQuery.startDate + '/'+ $scope.reqGamesQuery.endDate;

                    console.log('Counter at: '+i);
                    $scope.queriedGameCounter = i;


                        $http.get(testURL).success(function(response){
                            $scope.rangeGames = response;
                            var playerFromQuery = $scope.rangeGames[0].player_Name;
                            $scope.playerQueryGames.push(playerFromQuery);
                            $scope.playerQueryGames.push($scope.rangeGames);
                        })


                    if($scope.queriedGameCounter == 9){
                        $scope.hideStats = false;
                    }
                }
            }
            //--------------- End of Stat Building
        };


        $scope.getStats = function() {
            console.log('Running Stats Calculator');
                console.log($scope.playerQueryGames)
        };

    }]);