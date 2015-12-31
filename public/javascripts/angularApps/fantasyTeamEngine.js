/**
 * Created by Yinka on 2015-11-07.
 */
var app = angular.module('fantasyTeamEngine',[]);

app.controller('fantasyTeamEngine', ['$scope', '$http',

    //Retrieve DB
    function($scope, $http) {
        //DB Call to currentNBA, Retrieve DB Content
        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

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

        $scope.fantasyRoster = ['','','','','','','','','',''];
        $scope.currentPosition = 'default';
        $scope.positionList = ['pointGuard', 'shootingGuard', 'smallForward', 'powerForward', 'center', 'flexGuard', 'flexForward', 'utilityOne', 'utilityTwo', 'utilityThree'];
        $scope.previousGameRange = 0;

        $scope.selectPosition = function (selectedPos) {

            var currentPosition = $scope.positionList[selectedPos];

            $scope.currentPosition = currentPosition;
        };


        $scope.selectTeamFunction = function (teamNum) {
		$scope.roster=[];
			//Select team & Retrieve Roster from Player Table
            $scope.selectedTeam = $scope.currentTeams[teamNum];
            $scope.teamID = $scope.currentTeams[teamNum]._id;
            console.log($scope.teamID);
            console.log($scope.selectedTeam.team_name);
            var teamURL = '/api/findRoster/' + $scope.teamID;
            $http.get(teamURL).success(function(response) {
                $scope.roster = response;


                //Roster Now Holds All associated Players


                $scope.allowedPlayers = [];
                var allowedPlayers = [];
                // Looking for point guards
                if (($scope.currentPosition == 'pointGuard')) {
                    var j = 0;
                    for (var i = 0; i < $scope.roster.length; i++) {
                        if(($scope.roster[i].player_position) != null){
                            if (($scope.roster[i].player_position).indexOf("Point Guard") > -1) {
                                allowedPlayers.push($scope.roster[i]);
                                console.log(allowedPlayers[j].player_first_name +' '+allowedPlayers[j].player_last_name);
                                j++;
                            }
                        }
                    }
                    $scope.allowedPlayers = allowedPlayers;
                }

                // Looking for shooting guards
                else if (($scope.currentPosition == 'shootingGuard')) {

                    for (var i = 0; i < $scope.roster.length; i++) {
                        if(($scope.roster[i].player_position) != null) {
                            if (((($scope.roster[i].player_position).indexOf("guard") != -1) || (($scope.roster[i].player_position).indexOf("Guard") != -1)) && (($scope.roster[i].player_position).indexOf("Point") == -1)) {
                                allowedPlayers.push($scope.roster[i]);
                            }
                        }
                    }
                    $scope.allowedPlayers = allowedPlayers;
                }

                // Looking for small forwards
                else if (($scope.currentPosition == 'smallForward')) {

                    for (var i = 0; i < $scope.roster.length; i++) {
                        if(($scope.roster[i].player_position) != null) {
                            if (((($scope.roster[i].player_position).indexOf("forward") != -1) || (($scope.roster[i].player_position).indexOf("Forward") != -1)) && (($scope.roster[i].player_position).indexOf("Small") > -1)) {
                                allowedPlayers.push($scope.roster[i]);
                            }
                        }
                    }
                    $scope.allowedPlayers = allowedPlayers;
                }

                // Looking for power forwards
                else if (($scope.currentPosition == 'powerForward')) {

                    for (var i = 0; i < $scope.roster.length; i++) {
                        if(($scope.roster[i].player_position) != null) {
                            if (((($scope.roster[i].player_position).indexOf("forward") != -1) || (($scope.roster[i].player_position).indexOf("Forward") != -1)) && (($scope.roster[i].player_position).indexOf("Power") > -1)) {
                                allowedPlayers.push($scope.roster[i]);
                            }
                        }
                    }
                    $scope.allowedPlayers = allowedPlayers;
                }

                // Looking for Center
                else if (($scope.currentPosition == 'center')) {

                    for (var i = 0; i < $scope.roster.length; i++) {
                        if(($scope.roster[i].player_position) != null) {
                            if (((($scope.roster[i].player_position).indexOf("center") != -1) || (($scope.roster[i].player_position).indexOf("Center") != -1))) {
                                allowedPlayers.push($scope.roster[i]);
                            }
                        }
                    }
                    $scope.allowedPlayers = allowedPlayers;
                }

                // Looking for flex guards
                else if (($scope.currentPosition == 'flexGuard')) {

                    for (var i = 0; i < $scope.roster.length; i++) {
                        if(($scope.roster[i].player_position) != null) {
                            if (((($scope.roster[i].player_position).indexOf("guard") != -1) || (($scope.roster[i].player_position).indexOf("Guard") != -1))) {
                                allowedPlayers.push($scope.roster[i]);
                            }
                        }
                    }
                    $scope.allowedPlayers = allowedPlayers;
                }

                // Looking for flex forwards
                else if (($scope.currentPosition == 'flexForward')) {

                    for (var i = 0; i < $scope.roster.length; i++) {
                        if(($scope.roster[i].player_position) != null) {
                            if (((($scope.roster[i].player_position).indexOf("forward") != -1) || (($scope.roster[i].player_position).indexOf("Forward") != -1))) {
                                allowedPlayers.push($scope.roster[i]);
                            }
                        }
                    }
                    $scope.allowedPlayers = allowedPlayers;
                }

                // Looking for utility
                else {
                    $scope.allowedPlayers = $scope.roster;
                }
            })


        };

        $scope.assignPlayer = function (player) {

            $scope.assignedPlayer = player
        };

        $scope.addPlayer = function () {
            if ($scope.currentPosition == 'pointGuard') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.pointGuardImg = profileLocation;
                $scope.fantasyRoster[0] = $scope.assignedPlayer;
            }

            else if ($scope.currentPosition == 'shootingGuard') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.shootingGuardImg = profileLocation;
                $scope.fantasyRoster[1] = $scope.assignedPlayer;
            }

            else if ($scope.currentPosition == 'smallForward') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.smallForwardImg = profileLocation;
                $scope.fantasyRoster[2] = $scope.assignedPlayer;
            }

            else if ($scope.currentPosition == 'powerForward') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.powerForwardImg = profileLocation;
                $scope.fantasyRoster[3] = $scope.assignedPlayer;
            }

            else if ($scope.currentPosition == 'center') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.centerImg = profileLocation;
                $scope.fantasyRoster[4] = $scope.assignedPlayer;
            }

            else if ($scope.currentPosition == 'flexGuard') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.flexGuardImg = profileLocation;
                $scope.fantasyRoster[5] = $scope.assignedPlayer;
            }

            else if ($scope.currentPosition == 'flexForward') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.flexForwardImg = profileLocation;
                $scope.fantasyRoster[6] = $scope.assignedPlayer;
            }

            else if ($scope.currentPosition == 'utilityOne') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.utilityOneImg = profileLocation;
                $scope.fantasyRoster[7] = $scope.assignedPlayer;
            }

            else if ($scope.currentPosition == 'utilityTwo') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.utilityTwoImg = profileLocation;
                $scope.fantasyRoster[8] = $scope.assignedPlayer;
            }

            else if ($scope.currentPosition == 'utilityThree') {
                var profileLocation = '/profilePics/' + $scope.assignedPlayer.player_first_name + ' '+ $scope.assignedPlayer.player_last_name;
                $scope.utilityThreeImg = profileLocation;
                $scope.fantasyRoster[9] = $scope.assignedPlayer;
            }


        }

        $scope.getFantasyStats = function(PGRange, SGRange, SFRange, PFRange, CenterRange, FGRange, FFRange, UTOneRange, UTTwoRange, UTThreeRange){


            var playedGamesArray = [];

            //Test if Game Range within Point Guard Played Games
                if($scope.fantasyRoster[0].currentSeasonGames.length > PGRange) {
                    playedGamesArray[0] = PGRange;
                }
                else{
                    playedGamesArray[0] = $scope.fantasyRoster[0].currentSeasonGames.length - 1;
                }

            // Test if Game Range within Shooting Guard Played Games
                if($scope.fantasyRoster[1].currentSeasonGames.length > SGRange) {
                    playedGamesArray[1] = SGRange;
                }
                else{
                    playedGamesArray[1] = $scope.fantasyRoster[1].currentSeasonGames.length - 1;
                }

            //Test if Game Range within Small Forward Played Games
            if($scope.fantasyRoster[2].currentSeasonGames.length > SFRange) {
                playedGamesArray[2] = SFRange;
            }
            else{
                playedGamesArray[2] = $scope.fantasyRoster[2].currentSeasonGames.length - 1;
            }

            //Test if Game Range within Power Forward Played Games
            if($scope.fantasyRoster[3].currentSeasonGames.length > PFRange) {
                playedGamesArray[3] = PFRange;
            }
            else{
                playedGamesArray[3] = $scope.fantasyRoster[3].currentSeasonGames.length - 1;
            }

            //Test if Game Range within Center Played Games
            if($scope.fantasyRoster[4].currentSeasonGames.length > CenterRange) {
                playedGamesArray[4] = CenterRange;
            }
            else{
                playedGamesArray[4] = $scope.fantasyRoster[4].currentSeasonGames.length - 1;
            }

            //Test if Game Range within flexGuard Played Games
            if($scope.fantasyRoster[5].currentSeasonGames.length > FGRange) {
                playedGamesArray[5] = FGRange;
            }
            else{
                playedGamesArray[5] = $scope.fantasyRoster[5].currentSeasonGames.length - 1;
            }

            //Test if Game Range within flexForward Played Games
            if($scope.fantasyRoster[6].currentSeasonGames.length > FFRange) {
                playedGamesArray[6] = FFRange;
            }
            else{
                playedGamesArray[6] = $scope.fantasyRoster[6].currentSeasonGames.length - 1;
            }

            //Test if Game Range within utility ONe played Games
            if($scope.fantasyRoster[7].currentSeasonGames.length > UTOneRange) {
                playedGamesArray[7] = UTOneRange;
            }
            else{
                playedGamesArray[7] = $scope.fantasyRoster[7].currentSeasonGames.length - 1;
            }

            //Test Game Range within utility Two played Games
            if($scope.fantasyRoster[8].currentSeasonGames.length > UTTwoRange) {
                playedGamesArray[8] = UTTwoRange;
            }
            else{
                playedGamesArray[8] = $scope.fantasyRoster[8].currentSeasonGames.length - 1;
            }

            //Test Game Range within utility Three played Games
            if($scope.fantasyRoster[9].currentSeasonGames.length > UTThreeRange) {
                playedGamesArray[9] = UTThreeRange;
            }
            else{
                playedGamesArray[9] = $scope.fantasyRoster[9].currentSeasonGames.length - 1;
            }



            var totalGamesPlayed = 0;
            for(var m = 0; m < playedGamesArray.length; m++){

                totalGamesPlayed = totalGamesPlayed + playedGamesArray[m];
            }


            var tFGPer = 0;
            var tThreePPer = 0;
            var tFTPer = 0;
            var tTRB = 0;
            var tAssists = 0;
            var tSteals = 0;
            var tBlocks = 0;
            var tTOV = 0;
            var tFouls = 0;
            var tPoints = 0;
            var tPlusMinus = 0;
            var tDFS = 0;

            var FGCounter = 0;
            var threePCounter = 0;
            var FTCounter = 0;
            var TRBCounter = 0;
            var AssistCounter = 0;
            var StealCounter = 0;
            var BlockCounter = 0;
            var TOVCounter = 0;
            var FoulCounter = 0;
            var PointCounter = 0;
            var plusMinusCounter = 0;
            var DFSCounter = 0;
            var FGsum = 0;
            var threeSum = 0;
            var FTsum = 0;

            //Temp arrays that hold data for each player
            var tempFGPer = [];
            var tempThreePPer = [];
            var tempFTPer = [];
            var tempTRB = [];
            var tempAssists = [];
            var tempSteals = [];
            var tempBlocks = [];
            var tempTOV = [];
            var tempFouls = [];
            var tempPoints = [];
            var tempPlusMinus = [];
            var tempDFS = [];



            for(var i = 0; i < playedGamesArray.length; i++){
             
                for(var j = playedGamesArray[i]; j < $scope.fantasyRoster[i].currentSeasonGames.length; j++ ){
                    if($scope.fantasyRoster[i].currentSeasonGames[j].FGPer != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].FGPer !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].FGPer !=  "Did Not Play" && $scope.fantasyRoster[i].currentSeasonGames[j].FGA > 0){
                        tFGPer = tFGPer + Number($scope.fantasyRoster[i].currentSeasonGames[j].FGPer);
                        FGCounter++;


                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].threePPer != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].threePPer !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].threePPer !=  'Did Not Play' && $scope.fantasyRoster[i].currentSeasonGames[j].threePA > 0) {
                        tThreePPer = tThreePPer + Number($scope.fantasyRoster[i].currentSeasonGames[j].threePPer);
                        threePCounter++;


                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].FTPer != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].FTPer !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].FTPer !=  'Did Not Play' && $scope.fantasyRoster[i].currentSeasonGames[j].FTA > 0) {
                        tFTPer = tFTPer + Number($scope.fantasyRoster[i].currentSeasonGames[j].FTPer);
                        FTCounter++;


                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].TRB != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].TRB !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].TRB !=  'Did Not Play') {
                        tTRB = tTRB + Number($scope.fantasyRoster[i].currentSeasonGames[j].TRB);
                        TRBCounter++;
                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].assists != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].assists !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].assists !=  'Did Not Play') {
                        tAssists = tAssists + Number($scope.fantasyRoster[i].currentSeasonGames[j].assists);
                        AssistCounter++;
                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].steals != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].steals !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].steals !=  'Did Not Play') {
                        tSteals = tSteals + Number($scope.fantasyRoster[i].currentSeasonGames[j].steals);
                        StealCounter++;
                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].blocks != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].blocks !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].blocks !=  'Did Not Play') {
                        tBlocks = tBlocks + Number($scope.fantasyRoster[i].currentSeasonGames[j].blocks);
                        BlockCounter++;
                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].TOV != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].TOV !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].TOV !=  'Did Not Play') {
                        tTOV = tTOV + Number($scope.fantasyRoster[i].currentSeasonGames[j].TOV);
                        TOVCounter++;
                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].fouls != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].fouls !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].fouls !=  'Did Not Play'){
                        tFouls = tFouls +  Number($scope.fantasyRoster[i].currentSeasonGames[j].fouls);
                        FoulCounter++;
                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].points != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].points !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].points !=  'Did Not Play') {
                        tPoints = tPoints + Number($scope.fantasyRoster[i].currentSeasonGames[j].points);
                        PointCounter++;
                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].plusMinus != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].plusMinus !=  'Did Not Play') {
                        tPlusMinus = tPlusMinus + Number($scope.fantasyRoster[i].currentSeasonGames[j].plusMinus );
                        plusMinusCounter++;
                    }
                    if($scope.fantasyRoster[i].currentSeasonGames[j].DFS != 'Inactive' && $scope.fantasyRoster[i].currentSeasonGames[j].DFS !=  '' && $scope.fantasyRoster[i].currentSeasonGames[j].DFS !=  'Did Not Play'){
                        tDFS = tDFS +  Number($scope.fantasyRoster[i].currentSeasonGames[j].DFS);
                        DFSCounter++;
                    }

                }
                alert('end loop of player '+ i);
                //Store ith player info in tempArray
                if(FGCounter > 0) {
                    tempFGPer[i] = tFGPer / FGCounter;

                }else{
                    tempFGPer[i] = null;
                }


                //---------------------------------------------------------
                if(threePCounter > 0) {
                    tempThreePPer[i] = tThreePPer / threePCounter;

                }
                else{
                    tempThreePPer[i] = null;
                    alert('threeP of player '+ i + ' is '+ tempThreePPer[i]);
                }

                //--------------------------------------------------------------
                if(FTCounter > 0) {
                    tempFTPer[i] = tFTPer / FTCounter;
                }
                else{
                    tempFTPer[i] = null;
                }

                //------------------------------------------------------------------

                if(TRBCounter > 0) {
                    tempTRB[i] = tTRB / TRBCounter;
                }
                else{  tempTRB[i] = tTRB}

                //-------------------------------------------------------
                if(AssistCounter > 0) {
                    tempAssists[i] = tAssists / AssistCounter;
                }
                else{ tempAssists[i] = tAssists}

                //------------------------------
                if(StealCounter > 0) {
                    tempSteals[i] = tSteals / StealCounter;
                }
                else{
                    tempSteals[i] = tSteals
                }
                //------------------------------------------------------
                if(BlockCounter > 0) {
                    tempBlocks[i] = tBlocks / BlockCounter;
                }
                else{
                    tempBlocks[i] = tBlocks
                }
                //----------------------------------
                if(TOVCounter > 0) {
                    tempTOV[i] = tTOV / TOVCounter;
                }
                else{
                    tempTOV[i] = tTOV
                }
                //------------------------------
                if(FoulCounter > 0) {
                    tempFouls[i] = tFouls / FoulCounter;
                }
                else{
                    tempFouls[i] = tFouls
                }
                //---------------------------------------------------------
                if(PointCounter > 0) {
                    tempPoints[i] = tPoints / PointCounter;
                }
                else{
                    tempPoints[i] = tPoints
                }
                //----------------------------------------------------
                if(plusMinusCounter > 0) {
                    tempPlusMinus[i] = tPlusMinus / plusMinusCounter;
                }
                else{
                    tempPlusMinus[i] = tPlusMinus
                }
                //--------------------------------------
                if(DFSCounter > 0) {
                    tempDFS[i] = tDFS / DFSCounter;

                }
                else{
                    tempDFS[i] = tDFS
                }

                //Reset tValues
                tFGPer = 0;
                tThreePPer = 0;
                tFTPer = 0;
                tTRB = 0;
                tAssists = 0;
                tSteals = 0;
                tBlocks = 0;
                tTOV = 0;
                tFouls = 0;
                tPoints = 0;
                tPlusMinus = 0;
                tDFS = 0;

                FGCounter = 0;
                threePCounter = 0;
                FTCounter = 0;
                TRBCounter = 0;
                AssistCounter = 0;
                StealCounter = 0;
                BlockCounter = 0;
                TOVCounter = 0;
                FoulCounter = 0;
                PointCounter = 0;
                plusMinusCounter = 0;
                DFSCounter = 0;
            }

            var sFGPer = 0;
            var sThreePPer = 0;
            var sFTPer = 0;
            var sTRB = 0;
            var sAssists = 0;
            var sSteals = 0;
            var sBlocks = 0;
            var sTOV = 0;
            var sFouls = 0;
            var sPoints = 0;
            var sPlusMinus = 0;
            var sDFS = 0;
            
            

            
            
            //determine sum of all players on fantasy team
            for(var s = 0; s < $scope.fantasyRoster.length; s++){
                if(tempFGPer[s] != null) {
                    sFGPer += tempFGPer[s];
                    FGsum++;
                }

                if(tempThreePPer[s] != null) {
                    sThreePPer += tempThreePPer[s];
                    threeSum++;
                }

                if(tempFTPer != null) {
                    sFTPer += tempFTPer[s];
                    FTsum++;

                }

                sTRB += tempTRB[s] ;
                sAssists += tempAssists[s] ;
                sSteals += tempSteals[s] ;
                sBlocks += tempBlocks[s] ;
                sTOV += tempTOV[s] ;
                sFouls += tempFouls[s] ;
                sPoints += tempPoints[s] ;
                sPlusMinus += tempPlusMinus[s] ;
                sDFS += tempDFS[s] ;
            }


            $scope.fFGPer = (sFGPer/FGsum).toFixed(3);
            $scope.fThreePPer = (sThreePPer/threeSum).toFixed(3);
            $scope.fFTPer = (sFTPer/FTsum).toFixed(3);
            $scope.fTRB = (sTRB).toFixed(1);
            $scope.fAssists = (sAssists).toFixed(1);
            $scope.fSteals = (sSteals).toFixed(1);
            $scope.fBlocks = (sBlocks).toFixed(1);
            $scope.fTOV = (sTOV).toFixed(1);
            $scope.fFouls = (sFouls).toFixed(1);
            $scope.fPoints = (sPoints).toFixed(1);
            $scope.fPlusMinus = (sPlusMinus).toFixed(1);
            $scope.fDFS = (sDFS).toFixed(1);

//---------------------------------- Chart JS Set up ----------------------------------------//
            //----------------------FGER Chart----------------------------------------------//
            var FGPerdata = {
                        labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                        datasets: [
                                    {
                                        label: "Player FG Percentage Breakdown",
                                        fillColor: "rgba(38, 166, 91)",
                                        strokeColor: "rgba(151,187,205,0.8)",
                                        highlightFill: "rgba(207, 0, 15)",
                                        highlightStroke: "rgba(151,187,205,1)",
                                        data: [tempFGPer[0], tempFGPer[1], tempFGPer[2], tempFGPer[3], tempFGPer[4], tempFGPer[5], tempFGPer[6], tempFGPer[7], tempFGPer[8], tempFGPer[9]]
                                    }
                        ]

                    };

            var FGPerBar = document.getElementById('FGChart').getContext('2d');
            var FGPerChart = new Chart(FGPerBar).Bar(FGPerdata);

            //----------------------ThreePPer Chart----------------------------------------------//
            var threePPerdata = {
                labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                datasets: [
                    {
                        label: "Player Three Point Percentage Percentage Breakdown",
                        fillColor: "rgba(38, 166, 91)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(207, 0, 15)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: [tempThreePPer[0], tempThreePPer[1], tempThreePPer[2], tempThreePPer[3], tempThreePPer[4], tempThreePPer[5], tempThreePPer[6], tempThreePPer[7], tempThreePPer[8], tempThreePPer[9]]
                    }
                ]

            };

            var threePPerBar = document.getElementById('threePChart').getContext('2d');
            var threePPerChart  = new Chart(threePPerBar).Bar(threePPerdata);

            //----------------------FTPer Chart----------------------------------------------//
            var FTPerdata = {
                labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                datasets: [
                    {
                        label: "Player Free Throw Percentage Breakdown",
                        fillColor: "rgba(38, 166, 91)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(207, 0, 15)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: [tempFTPer[0], tempFTPer[1], tempFTPer[2], tempFTPer[3], tempFTPer[4], tempFTPer[5], tempFTPer[6], tempFTPer[7], tempFTPer[8], tempFTPer[9]]
                    }
                ]

            };

            var FTPerBar = document.getElementById('FTChart').getContext('2d');
            var FTPerChart  = new Chart(FTPerBar).Bar(FTPerdata);

            //----------------------Total Rebounds Chart----------------------------------------------//
            var TRBdata = {
                labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                datasets: [
                    {
                        label: "Player Rebound Total Breakdown",
                        fillColor: "rgba(38, 166, 91)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(207, 0, 15)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: [tempTRB[0], tempTRB[1], tempTRB[2], tempTRB[3], tempTRB[4], tempTRB[5], tempTRB[6], tempTRB[7], tempTRB[8], tempTRB[9]]
                    }
                ]

            };

            var TRBPerBar = document.getElementById('TRBChart').getContext('2d');
            var TRBChart  = new Chart(TRBPerBar).Bar(TRBdata);

            //----------------------Total Assists Chart----------------------------------------------//
            var Assistdata = {
                labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                datasets: [
                    {
                        label: "Player Total Assists Breakdown",
                        fillColor: "rgba(38, 166, 91)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(207, 0, 15)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: [tempAssists[0], tempAssists[1], tempAssists[2], tempAssists[3], tempAssists[4], tempAssists[5], tempAssists[6], tempAssists[7], tempAssists[8], tempAssists[9]]
                    }
                ]

            };

            var AssistBar = document.getElementById('AssistChart').getContext('2d');
            var assistChart  = new Chart(AssistBar).Bar(Assistdata);

            //----------------------Total Steals Chart----------------------------------------------//
            var Stealdata = {
                labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                datasets: [
                    {
                        label: "Player Total Steals Breakdown",
                        fillColor: "rgba(38, 166, 91)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(207, 0, 15)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: [tempSteals[0], tempSteals[1], tempSteals[2], tempSteals[3], tempSteals[4], tempSteals[5], tempSteals[6], tempSteals[7], tempSteals[8], tempSteals[9]]
                    }
                ]

            };

            var StealBar = document.getElementById('StealChart').getContext('2d');
            var stealChart  = new Chart(StealBar).Bar(Stealdata);

            //----------------------Total Block Chart----------------------------------------------//
            var Blocksdata = {
                labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                datasets: [
                    {
                        label: "Player Block Total Breakdown",
                        fillColor: "rgba(38, 166, 91)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(207, 0, 15)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: [tempBlocks[0], tempBlocks[1], tempBlocks[2], tempBlocks[3], tempBlocks[4], tempBlocks[5], tempBlocks[6], tempBlocks[7], tempBlocks[8], tempBlocks[9]]
                    }
                ]

            };

            var BlocksBar = document.getElementById('BlockChart').getContext('2d');
            var blockChart  = new Chart(BlocksBar).Bar(Blocksdata);

            //----------------------Total TOV Chart----------------------------------------------//
            var TOVdata = {
                labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                datasets: [
                    {
                        label: "Player Turnover Total Breakdown",
                        fillColor: "rgba(38, 166, 91)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(207, 0, 15)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: [tempTOV[0], tempTOV[1], tempTOV[2], tempTOV[3], tempTOV[4], tempTOV[5], tempTOV[6], tempTOV[7], tempTOV[8], tempTOV[9]]
                    }
                ]

            };

            var TOVBar = document.getElementById('TOVChart').getContext('2d');
            var TOVChart  = new Chart(TOVBar).Bar(TOVdata);

            //----------------------Total fouls Chart----------------------------------------------//
            var Fouldata = {
                labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                datasets: [
                    {
                        label: "Player Total Fouls Breakdown",
                        fillColor: "rgba(38, 166, 91)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(207, 0, 15)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: [tempFouls[0], tempFouls[1], tempFouls[2], tempFouls[3], tempFouls[4], tempFouls[5], tempFouls[6], tempFouls[7], tempFouls[8], tempFouls[9]]
                    }
                ]

            };

            var FoulBar = document.getElementById('FoulChart').getContext('2d');
            var foulChart  = new Chart(FoulBar).Bar(Fouldata);

            //----------------------Total Points Chart----------------------------------------------//
            var Pointsdata = {
                labels: [$scope.fantasyRoster[0].player_name, $scope.fantasyRoster[1].player_name, $scope.fantasyRoster[2].player_name, $scope.fantasyRoster[3].player_name, $scope.fantasyRoster[4].player_name, $scope.fantasyRoster[5].player_name, $scope.fantasyRoster[6].player_name, $scope.fantasyRoster[7].player_name, $scope.fantasyRoster[8].player_name, $scope.fantasyRoster[9].player_name],
                datasets: [
                    {
                        label: "Player Points Per Game Breakdown",
                        fillColor: "rgba(38, 166, 91)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(207, 0, 15)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: [tempPoints[0], tempPoints[1], tempPoints[2], tempPoints[3], tempPoints[4], tempPoints[5], tempPoints[6], tempPoints[7], tempPoints[8], tempPoints[9]]
                    }
                ]

            };

            var PointsBar = document.getElementById('PointsChart').getContext('2d');
            var pointsChart  = new Chart(PointsBar).Bar(Pointsdata);









        }   //End of function

        $scope.getGamesInRange = function(dateRange){

            //----------Get Current Date--------------------------------------//
            var currentDate = new Date();
            var currentDateMil = currentDate.getTime();


            //----------Find bottom Range-----------//
            var lastDateMil = currentDateMil - (((1000 * 60 * 60 * 24))*dateRange);


            var dateHolder = 0;
            var yearTemp = 0;
            var monthTemp = 0;
            var dayTemp = 0;

            var gameDate = 0;
            var gameRangeStorage = [82,82,82,82,82,82,82,82,82,82];
            var tempGameDate;



            for(var playerPos = 0; playerPos < $scope.fantasyRoster.length; playerPos++){

                for(var gamePos = 0; gamePos < $scope.fantasyRoster[playerPos].currentSeasonGames.length; gamePos++ ){

                    //Divide date by -
                    dateHolder = ($scope.fantasyRoster[playerPos].currentSeasonGames[gamePos].game_Date).split('-');

                    //Set year
                    yearTemp = Number(dateHolder[0]);

                    //Set month
                    monthTemp = Number(dateHolder[1]) - 1;


                    //Set day
                    dayTemp = Number(dateHolder[2]);



                    gameDate = new Date();

                    //Create Date from game info
                    gameDate.setFullYear(yearTemp, monthTemp, dayTemp);


                   //Check if created date in range
                    if(((gameDate.getTime()) >= lastDateMil) && ((gameDate.getTime()) <= currentDateMil)){
                        tempGameDate = gamePos;
                        if(tempGameDate < gameRangeStorage[playerPos]) {
                            gameRangeStorage[playerPos] = tempGameDate;
                        }
                    }

                }

            }

            $scope.getFantasyStats(gameRangeStorage[0],gameRangeStorage[1], gameRangeStorage[2], gameRangeStorage[3], gameRangeStorage[4], gameRangeStorage[5], gameRangeStorage[6], gameRangeStorage[7], gameRangeStorage[8], gameRangeStorage[9])



        }



    }]);

