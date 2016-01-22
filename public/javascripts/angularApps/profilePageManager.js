/**
 * Created by yinka_000 on 2016-01-05.
 */
var app = angular.module('profilePageManager',['ngMaterial']);

app.controller('profilePageManager', ['$scope', '$http',
    function($scope, $http) {

        $scope.endDate = Date.now();
        $scope.endDate = new Date($scope.endDate);
        $scope.startDate = $scope.endDate - (30*86400000);
        $scope.startDate = new Date($scope.startDate);

        $scope.hideFantasyRoster = true;
        $scope.hideResults = true;
        $scope.stats = [];

        $scope.hideGetStatsBtn = false;
        $scope.hideUpdateStatsBtn = true;
        $scope.hideDisplayStatsBtn = true;

        $scope.userPlayers = [];

        //HTTP Call , Retrieve User ID
        $http.get('/fantasyTeam/userID').success(function(response) {
            //Store DB as variable $scope.currentTeams
             var currentUserID = response;

            var url = '/api/fantasyTeam/'+ currentUserID;
            var url2 = '/api/favPlayer/'+ currentUserID;

            $http.get(url).success(function(response) {
                //Store DB as variable $scope.currentTeams
                $scope.userTeams = response;
                $scope.fantasyRosters = $scope.userTeams.roster;
                console.log('Finished Team Retrieval');
            });

            $http.get(url2).success(function(playerIDs) {
                //Store DB as variable $scope.currentTeams
                $scope.playerRefs = playerIDs;
                console.log('Finished Player Retrieval');

                for(var i = 0; i<$scope.playerRefs.length; i++){

                    var playerURL = '/api/findPlayer/'+ $scope.playerRefs[i].player;
                    $http.get(playerURL).success(function(player) {
                        $scope.userPlayers.push(player);
                        console.log('Player is: ');
                        console.log(player);
                    });
                }


            });
        });

        $scope.viewRoster = function(teamNum){
            //Reset
            $scope.selectedTeam = {};
            $scope.selectedRoster = {};
            $scope.hideFantasyRoster = true;
            // Implement

            $scope.selectedTeam = $scope.userTeams[teamNum];
                $scope.selectedRoster = $scope.selectedTeam.roster;
                $scope.hideFantasyRoster = false;

        };

//===============================================================================================
        //=======================================================================================

        $scope.getStats = function() {

            //**************************************************************************************
            $scope.playerQueryGames = [];

            $scope.reqGamesQuery = {};

            for(var i = 0; i<$scope.selectedRoster.length; i++)
                //Add Games with in range into $scope.playerQueryGames, position in array corresponds to player position ie. 0 = point guard, 1 = shooting guard
                //Each position holds an array that contains games
            {

                $scope.rangeGames = null;
                $scope.reqGamesQuery.player_Name = $scope.selectedRoster[i].player_first_name + ' ' + $scope.selectedRoster[i].player_last_name;
                $scope.reqGamesQuery.startDate = $scope.startDate;
                $scope.reqGamesQuery.endDate = $scope.endDate;
                $scope.reqGamesQuery.player_ID = $scope.selectedRoster[i]._id;

                var testURL = '/api/queryGameByDates/' + $scope.reqGamesQuery.player_ID + "/" + $scope.reqGamesQuery.player_Name + "/" + $scope.reqGamesQuery.startDate + '/' + $scope.reqGamesQuery.endDate;

                console.log('Counter at: ' + i);
                $scope.queriedGameCounter = i;

                //alert('Test');
                $http.get(testURL).success(function (response) {
                    $scope.rangeGames = response;
                    var playerFromQuery = $scope.rangeGames[0].player_Name;
                    $scope.playerQueryGames.push(playerFromQuery);
                    $scope.playerQueryGames.push($scope.rangeGames);

                });

            }
            $scope.hideDisplayStatsBtn = false;
            $scope.hideGetStatsBtn = true;
            $scope.hideUpdateStatsBtn = true;
            $scope.hideResults = true;

        };

        $scope.dblStats = function(){
            $scope.buildStats();
            $scope.hideResults = false;
            $scope.buildChart();
        };
            //**************************************************************************************
            $scope.buildStats = function(){
                $scope.hideDisplayStatsBtn = true;
                $scope.hideUpdateStatsBtn = false;
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
                    if(gameArray[g].FGA > 0){
                        $scope.stats[p].fFGPer += (gameArray[g].FGM / gameArray[g].FGA);
                    }
                    if(gameArray[g].FTA > 0){
                        $scope.stats[p].fFTPer += (gameArray[g].FTM / gameArray[g].FTA);
                    }
                    if(gameArray[g].threes_attempted > 0){
                        $scope.stats[p].fThreePPer += (gameArray[g].threes_made / gameArray[g].threes_attempted);
                    }


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
            $scope.buildChart();
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
//===============================================================================================
        //=======================================================================================
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
//====================================================================================================



    }]);