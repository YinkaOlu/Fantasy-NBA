/**
 * Created by yolu on 12/29/2015.
 */
var app = angular.module('fantasySelectionEngine',['ngMaterial']);

app.controller('fantasySelectionEngine', ['$scope', '$http',
    function($scope, $http) {

        //HTTP Call to nba database, Retrieve team list
        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });
        //-------------------------------------------------
        //-------------------------------------------------

        $scope.hideWarning = true;
        $scope.hideBuildBtn = false;
        $scope.hideSaveBtn = true;
        $scope.hideStatsBtn = true;
        $scope.hideUpdateStatsBtn = true;

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

        //Hide Results Display
        $scope.hideResults = true;

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
        $scope.saveTeam = function(){
            //HTTP Call to server, Retrieve User Info
            $http.get('/fantasyTeam/userID').success(function(response){
                //Store DB as variable $scope.currentTeams
                $scope.currentUser = response;

                var teamToSave = {};
                teamToSave.fantasyTeamName = $scope.fantasyTeamName;
                teamToSave.userID = $scope.currentUser;
                teamToSave.roster = $scope.fantasyRoster;

                $http.post('/api/saveFantasyTeam', teamToSave);
            });

        };


        $scope.buildFantasyTeam = function(){
            var one_day = 1000*60*60*24;



            if($scope.startDate == null || $scope.endDate == null) {
                $scope.hideWarning = false;
                if($scope.startDate == null)
                    console.log('Pick Start Date');
                else
                    console.log('Pick End Date')
            }

            //----------- Start of Stat Building
            else{
                $scope.hideWarning = true;
                $scope.hideBuildBtn = true;
                $scope.hideStatsBtn = false;
                $scope.hideSaveBtn = false;

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
            $scope.stats = [];
            //$scope.stats.fPoints = 0;
            //$scope.stats.fAssists = 0;
            //$scope.stats.fBlocks = 0;
            //$scope.stats.fTRB = 0;
            //$scope.stats.fFGPer = 0;
            //$scope.stats.fThreePPer = 0;
            //$scope.stats.fFTPer = 0;
            //$scope.stats.fSteals = 0;
            //$scope.stats.fTOV = 0;
            //$scope.stats.fFouls = 0;

            $scope.totalPoint = 0;
            $scope.totalAssists = 0;
            $scope.totalBlocks = 0;
            $scope.totalSteals = 0;
            $scope.totalTOV = 0;
            $scope.totalFouls = 0;
            $scope.totalTRB = 0;

            $scope.totalGamesCounter = 0;

            console.log('Running Stats Calculator');
            console.log($scope.playerQueryGames);
            console.log('------------');

            $scope.totalsPerPlayer = [];

            for (var p = 0; p < $scope.playerQueryGames.length; p++) {
                console.log("Stats for: " + $scope.playerQueryGames[p] + '\n' + $scope.playerQueryGames [p + 1]);
                var gameArray = $scope.playerQueryGames [p + 1];
                console.log(gameArray);

                $scope.stats[p] = {};
                $scope.stats[p].fPoints = 0;
                $scope.stats[p].fAssists = 0;
                $scope.stats[p].fBlocks = 0;
                $scope.stats[p].fTRB = 0;
                $scope.stats[p].fFGPer = 0;
                $scope.stats[p].fThreePPer = 0;
                $scope.stats[p].fFTPer = 0;
                $scope.stats[p].fSteals = 0;
                $scope.stats[p].fTOV = 0;
                $scope.stats[p].fFouls = 0;

                var counter = 0;

                for (var g = 0; g < gameArray.length; g++) {
                    console.log('Calculating total Points at: ' + g);


                    $scope.stats[p].fPoints += +gameArray[g].PTS;
                    $scope.stats[p].fAssists += +gameArray[g].AST;
                    $scope.stats[p].fBlocks += +gameArray[g].BLK;
                    $scope.stats[p].fSteals += +gameArray[g].STL;
                    $scope.stats[p].fTOV += +gameArray[g].TOV;
                    $scope.stats[p].fFouls += +gameArray[g].Fouls;


                    $scope.stats[p].fTRB += (gameArray[g].DRB + gameArray[g].ORB);

                    $scope.stats[p].fFGPer += (gameArray[g].FGM / gameArray[g].FGA);
                    $scope.stats[p].fFTPer += (gameArray[g].FTM / gameArray[g].FTA);
                    $scope.stats[p].fThreePPer += (gameArray[g].threes_made / gameArray[g].threes_attempted);

                    ///$scope.stats.fPoints += + gameArray[g].PTS;
                    //$scope.stats.fAssists += + gameArray[g].AST;
                    //$scope.stats.fBlocks += + gameArray[g].BLK;
                    //$scope.stats.fSteals += + gameArray[g].STL;
                    //$scope.stats.fTOV += + gameArray[g].TOV;
                    //$scope.stats.fFouls += + gameArray[g].Fouls;


                    //$scope.stats.fTRB += (gameArray[g].DRB + gameArray[g].ORB);

                    //$scope.stats.fFGPer += (gameArray[g].FGM/gameArray[g].FGA);
                    //$scope.stats.fFTPer += (gameArray[g].FTM/gameArray[g].FTA);
                    //$scope.stats.fThreePPer += (gameArray[g].threes_made/gameArray[g].threes_attempted);

                    $scope.totalGamesCounter++;
                    counter++
                }
                //Store Total Team Stats
                $scope.totalPoint += $scope.stats[p].fPoints;
                $scope.totalAssists += $scope.stats[p].fAssists;
                $scope.totalBlocks += $scope.stats[p].fBlocks;
                $scope.totalSteals += $scope.stats[p].fSteals;
                $scope.totalTOV += $scope.stats[p].fTOV;
                $scope.totalFouls += $scope.stats[p].fFouls;
                $scope.totalTRB += $scope.stats[p].fTRB;

                $scope.stats[p].fPoints = $scope.stats[p].fPoints / counter;
                $scope.stats[p].fAssists = $scope.stats[p].fAssists / counter;
                $scope.stats[p].fBlocks = $scope.stats[p].fBlocks / counter;
                $scope.stats[p].fSteals = $scope.stats[p].fSteals / counter;
                $scope.stats[p].fTOV = $scope.stats[p].fTOV / counter;
                $scope.stats[p].fFouls = $scope.stats[p].fFouls / counter;
                $scope.stats[p].fTRB = $scope.stats[p].fTRB / counter;

                $scope.stats[p].fFGPer = ($scope.stats[p].fFGPer) / counter;
                $scope.stats[p].fFTPer = ($scope.stats[p].fFTPer) / counter;
                $scope.stats[p].fThreePPer = ($scope.stats[p].fThreePPer) / counter;

                p++;
            }
            console.log('Stat content');
            console.log($scope.stats);
            //Create Charts
            //$scope.buildPointsChart();
            $scope.buildChart();

            $scope.hideResults = false;
            $scope.hideUpdateStatsBtn = false;
            $scope.hideStatsBtn = true;

        };

//-----------------------------------------------------------------------------------
//--------------- View Calculator Functions----------------------------------------
        //Return Total PTS of entire Team in Date Range
        $scope.getTotalPTS = function(){
            var teamTotalPTS = 0;


            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);

            for(var i = 0; i < statLength; i++){
                teamTotalPTS += $scope.stats[i].fPoints;
                console.log(teamTotalPTS);
                i++;
            }

            return teamTotalPTS;
        };

        //Return Total FGPer per game of entire Team in Date Range
        $scope.getTeamFGPer = function(){
            var teamTotalFGPer = 0;

            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);

            for(var i = 0; i < $scope.stats.length; i++){
                teamTotalFGPer += $scope.stats[i].fFGPer;
                console.log('***'+teamTotalFGPer);
                i++;
            }

            return (teamTotalFGPer/(statLength));
        };

        //Return Total ThreePPer per game of entire Team in Date Range
        $scope.getTeamThreePPer = function(){
            var teamThreePPer = 0;

            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);

            for(var i = 0; i <$scope.stats.length; i++){
                teamThreePPer += $scope.stats[i].fThreePPer;
                console.log('*-*-'+teamThreePPer);
                i++;
            }

            return (teamThreePPer/statLength);
        };

        //Return Total ThreePPer per game of entire Team in Date Range
        $scope.getTeamFTPer = function(){
            var teamFTPer = 0;

            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);
            for(var i = 0; i <$scope.stats.length; i++){
                teamFTPer += $scope.stats[i].fFTPer;
                console.log('*-*-'+teamFTPer);
                i++;
            }
            return (teamFTPer/statLength);
        };

        //Return Total Assists per game of entire Team in Date Range
        $scope.getTeamAssists = function(){
            var teamAssists = 0;

            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);
            for(var i = 0; i <$scope.stats.length; i++){
                teamAssists += $scope.stats[i].fAssists;
                console.log('*-*-'+teamAssists);
                i++;
            }
            return (teamAssists);
        };

        //Return Total Steals per game of entire Team in Date Range
        $scope.getTeamSteals = function(){
            var teamSteals = 0;

            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);
            for(var i = 0; i <$scope.stats.length; i++){
                teamSteals += $scope.stats[i].fSteals;
                console.log('*-*-'+teamSteals);
                i++;
            }
            return (teamSteals);
        };

        //Return Total Blocks per game of entire Team in Date Range
        $scope.getTeamBlocks = function(){
            var teamBlocks = 0;

            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);
            for(var i = 0; i <$scope.stats.length; i++){
                teamBlocks += $scope.stats[i].fBlocks;
                console.log('*-*-'+teamBlocks);
                i++;
            }
            return (teamBlocks);
        };

        //Return Total Blocks per game of entire Team in Date Range
        $scope.getTeamTRB = function(){
            var teamTRB = 0;

            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);
            for(var i = 0; i <$scope.stats.length; i++){
                teamTRB += $scope.stats[i].fTRB;
                console.log('*-*-'+teamTRB);
                i++;
            }
            return (teamTRB);
        };

        //Return Total TOVs per game of entire Team in Date Range
        $scope.getTeamTOV = function(){
            var teamTOV = 0;

            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);
            for(var i = 0; i <$scope.stats.length; i++){
                teamTOV += $scope.stats[i].fTOV;
                console.log('*-*-'+teamTOV);
                i++;
            }
            return (teamTOV);
        };

        //Return Total Fouls per game of entire Team in Date Range
        $scope.getTeamFouls = function(){
            var teamFouls = 0;

            var statLength = Math.floor($scope.stats.length/2) + ($scope.stats.length % 2);
            console.log('Amount of players in array'+statLength);
            for(var i = 0; i <$scope.stats.length; i++){
                teamFouls += $scope.stats[i].fFouls;
                console.log('*-*-'+teamFouls);
                i++;
            }
            return (teamFouls);
        };

        //-------------------------------------------------------------------------//
        //-------------------------------------------------------------------------
        //---------------------------------- Chart Set up ----------------------------------------//
        //---------------------- Points Chart----------------------------------------------//
        // Create the Points table.
        $scope.buildChart = function () {
            //Points Chart
            var pointsData = new google.visualization.DataTable();

            pointsData.addColumn('string', 'Player Name');
            pointsData.addColumn('number', 'Points');

            for (var i = 0; i < $scope.stats.length; i++) {
                pointsData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fPoints]]);
                i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Fantasy Team Scoring Breakdown'
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.ColumnChart(document.getElementById('PointsChart'));
            chart.draw(pointsData, options);
         //-----------------------------------------------------
            //Field Goal Chart
            var FGData = new google.visualization.DataTable();
            FGData.addColumn('string', 'Player Name');
            FGData.addColumn('number', 'FT Percentage');

            for (var i = 0; i < $scope.stats.length; i++) {
                FGData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fFGPer]]);
                i++;
            }

            // Set Points Chart options
            var FGOptions = {
                'title': 'Fantasy Team FG % Breakdown'
            };

            // Instantiate and draw Points chart
            var chartFG = new google.visualization.ColumnChart(document.getElementById('FGChart'));
            chartFG.draw(FGData, FGOptions);
        //-----------------------------------------------------
            //Three Pointer Chart
            var threePData = new google.visualization.DataTable();
            threePData.addColumn('string', 'Player Name');
            threePData.addColumn('number', '3P Percentage');

            for (var i = 0; i < $scope.stats.length; i++) {
                threePData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fThreePPer]]);
                i++;
            }

            // Set Points Chart options
            var threePOptions = {
                'title': 'Fantasy Team Three-Point % Breakdown'
            };

            // Instantiate and draw Points chart
            var chartThreeP = new google.visualization.ColumnChart(document.getElementById('threePChart'));
            chartThreeP.draw(threePData, threePOptions);
        //-----------------------------------------------------
            //Free Throw Chart
            var FTData = new google.visualization.DataTable();
            FTData.addColumn('string', 'Player Name');
            FTData.addColumn('number', 'Free Throw Percentage');

            for (var i = 0; i < $scope.stats.length; i++) {
                FTData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fFTPer]]);
                i++;
            }

            // Set Points Chart options
            var FTOptions = {
                'title': 'Fantasy Team Free Throw % Breakdown'
            };

            // Instantiate and draw Points chart
            var chartFT = new google.visualization.ColumnChart(document.getElementById('FTChart'));
            chartFT.draw(FTData, FTOptions);
         //-----------------------------------------------------
            //Assists Chart
            var assistData = new google.visualization.DataTable();
            assistData.addColumn('string', 'Player Name');
            assistData.addColumn('number', 'Assists');

            for (var i = 0; i < $scope.stats.length; i++) {
                assistData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fAssists]]);
                i++;
            }

            // Set Points Chart options
            var AssistsOptions = {
                'title': 'Fantasy Team Assists Breakdown'
            };

            // Instantiate and draw Points chart
            var chartAssists = new google.visualization.ColumnChart(document.getElementById('AssistChart'));
            chartAssists.draw(assistData, AssistsOptions);
         //-----------------------------------------------------
            //Steals Chart
            var stealsData = new google.visualization.DataTable();
            stealsData.addColumn('string', 'Player Name');
            stealsData.addColumn('number', 'Steals');

            for (var i = 0; i < $scope.stats.length; i++) {
                stealsData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fSteals]]);
                i++;
            }

            // Set Points Chart options
            var StealsOptions = {
                'title': 'Fantasy Team Steals Breakdown'
            };

            // Instantiate and draw Points chart
            var chartSteal = new google.visualization.ColumnChart(document.getElementById('StealChart'));
            chartSteal.draw(stealsData, StealsOptions);
         //-----------------------------------------------------
            //Blocks Chart
            var blocksData = new google.visualization.DataTable();
            blocksData.addColumn('string', 'Player Name');
            blocksData.addColumn('number', 'Blocks');

            for (var i = 0; i < $scope.stats.length; i++) {
                blocksData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fBlocks]]);
                i++;
            }

            // Set Points Chart options
            var BlocksOptions = {
                'title': 'Fantasy Team Blocks Breakdown'
            };

            // Instantiate and draw Points chart
            var chartBlock = new google.visualization.ColumnChart(document.getElementById('BlockChart'));
            chartBlock.draw(blocksData, BlocksOptions);
        //-----------------------------------------------------
            //Rebounds Chart
            var reboundsData = new google.visualization.DataTable();
            reboundsData.addColumn('string', 'Player Name');
            reboundsData.addColumn('number', 'Rebounds');

            for (var i = 0; i < $scope.stats.length; i++) {
                reboundsData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fTRB]]);
                i++;
            }

            // Set Points Chart options
            var ReboundsOptions = {
                'title': 'Fantasy Team Rebounds Breakdown'
            };

            // Instantiate and draw Points chart
            var chartTRB = new google.visualization.ColumnChart(document.getElementById('TRBChart'));
            chartTRB.draw(reboundsData, ReboundsOptions);

        //-----------------------------------------------------
            //TOV Chart
            var TOVData = new google.visualization.DataTable();
            TOVData.addColumn('string', 'Player Name');
            TOVData.addColumn('number', 'TurnOver');

            for (var i = 0; i < $scope.stats.length; i++) {
                TOVData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fTOV]]);
                i++;
            }

            // Set Points Chart options
            var TOVOptions = {
                'title': 'Fantasy Team TOV Breakdown'
            };

            // Instantiate and draw Points chart
            var chartTOV = new google.visualization.ColumnChart(document.getElementById('TOVChart'));
            chartTOV.draw(TOVData, TOVOptions);


    //-----------------------------------------------------
        //Fouls Chart
        var FoulData = new google.visualization.DataTable();
        FoulData.addColumn('string', 'Player Name');
        FoulData.addColumn('number', 'Fouls');

        for (var i = 0; i < $scope.stats.length; i++) {
            FoulData.addRows([[$scope.playerQueryGames[i], $scope.stats[i].fFouls]]);
            i++;
        }

        // Set Points Chart options
        var FoulOptions = {
            'title': 'Fantasy Team Foul Breakdown'
        };

        // Instantiate and draw Points chart
        var chartFoul = new google.visualization.ColumnChart(document.getElementById('FoulChart'));
        chartFoul.draw(FoulData, FoulOptions);
    };

    }]);