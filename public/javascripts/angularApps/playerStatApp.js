/**
 * Created by yolu on 12/31/2015.
 */
var app = angular.module('playerStatApp',['ngMaterial']);

app.controller('playerStatCtrl', ['$scope', '$http','$interval',
    function($scope, $http, $interval){
        /*=====================================================
                    UI Controller Scope Variables
         =====================================================
         */

        /**
         * @description Variable that will determine if Results will show
         * @type {boolean}
         */
        $scope.hideResultsLoading = true;

        /**
         * @description Variable that will determine if NBA team list will show
         * @type {boolean}
         */
        $scope.hideTeams = false;
        /**
         * @description Variable that will determine if Roster of selected team will show
         * @type {boolean}
         */
        $scope.hideRoster = true;

        $scope.hidePersonalView = true;

        /**
         * @description HTTP Get request to recieve all NBA Teams, stored in $scope.currentTeams
         */

        /*=====================================================
                        List of NBA Teams
         =====================================================
         */

        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });
        /**
         * @description Variable that will determine if Results of Query will show
         * @type {boolean}
         */
        $scope.hideResults = true;

        /**
         * @description Assigns a Selected team to $scope.selectedTeam
         * Long. teamPos is the position of the team in the NBA list. When function is run, selected team's id will be extracted & an HTTP Get call will be made to retrieve selected team's roster.
         * @param teamPos
         */

        /*=====================================================
                        Select Team from NBA List
         =====================================================
         */
        $scope.selectTeamFunction = function(teamPos) {
            $scope.selectedTeam = $scope.currentTeams[teamPos];
            $scope.teamID = $scope.currentTeams[teamPos]._id;
            console.log($scope.teamID);
            console.log($scope.selectedTeam.team_name);
            var teamURL = '/api/findRoster/' + $scope.teamID;
            $http.get(teamURL).success(function(response){
                $scope.roster = response;
            });

            $scope.hideResults = true;
            $scope.hidePersonalView = true;
            $scope.hideTeams = true;
            $scope.hideRoster = false;

        };

        /**
         * @description Extracted a selected player from selected team view players position in team roster array.
         * @param playerPos
         */

        /*=====================================================
                    Select Player from Team Roster
         =====================================================
         */
        $scope.selectPlayerFunction = function(playerPos){
            $scope.player = $scope.roster[playerPos];
            $scope.playerID = $scope.player._id;
            console.log($scope.playerID);
            console.log($scope.player.player_first_name);
            $scope.height = ''+Math.floor($scope.player.player_height/12)+' ft '+($scope.player.player_height%12)+' inches';
            $scope.hideResults = true;
            $scope.hidePersonalView = false;
            $scope.hideRoster = true;
        };

        /*=====================================================
                Scope Functions for specific stat display
         =====================================================
         */

        /**
         * @description Converts player height in inches to feet & inches, and return values
         * @param playerPos
         * @returns {string}
         */
        $scope.getHeight = function(playerPos){
            var player = $scope.roster[playerPos];
            var height = ''+Math.floor(player.player_height/12)+' ft '+(player.player_height%12)+' inches';
            return height;
        };

        /**
         * @description Returns value of player draft year.
         * Long. If draft year is null or empty will return 'Undrafted'
         * @param playerPos
         * @returns {*}
         */
        $scope.getDraftYear = function(playerPos){
            var player = $scope.roster[playerPos];
            var draftYear;
            if(player.player_draft != null && player.player_draft != '')
                draftYear = player.player_draft;
            else{
                draftYear = 'Undrafted';
            }
            return draftYear;
        };

        /**
         * @description Return players health status
         * @param playerPos
         * @returns {*}
         */
        $scope.getPlayerStatus = function(playerPos){
            var player = $scope.roster[playerPos];
            var status = player.player_status;
            return status;
        };

        /*=====================================================
                Button Functions to Manage what Displays
         =====================================================
         */
        /**
         * @description Hides Roster, Shows NBA team list
         */
        $scope.backToTeams = function(){
            $scope.hideTeams = false;
            $scope.hideRoster = true;
        };

        /**
         * @description Hides Loading Animation, Results but shows Roster. NBA team list still hidden
         */
        $scope.backToRoster = function(){
            $scope.hideResultsLoading = true;
            $scope.hideResults = true;
            $scope.hideRoster = false;
        };

        /*=====================================================
                        Display Results Functions
         =====================================================
         */

        /**
         * @description Triggered when users clicks on 'Get Season Stats' button. Gets player id, and triggers function displayResults()
         * @param {number} playerPos The players position in the team roster array
         */
        $scope.directResults = function(playerPos){
            $scope.hideResultsLoading = false;
            $scope.player = $scope.roster[playerPos];
            $scope.playerID = $scope.player._id;
            $scope.displayResults();
            $scope.hideRoster = true;
        };

        /**
         * @description HTTP Get request to retrieves season stats of selected player. Assigns stats to scope variables
         */
        var getSeasonStats = function(){
            var statsURL = '/calculate/findGames/' + $scope.playerID;
            $http.get(statsURL).success(function(response) {
                console.log(response);
                $scope.PPG = response.PPG;
                $scope.APG = response.APG;
                $scope.RPG = response.RPG;
                $scope.TOV = response.TOV;
                $scope.Fouls = response.Fouls;
                $scope.BPG = response.BPG;
                $scope.plusMinus = response.plusMinus;
                $scope.MPG = response.MPG;
                $scope.Steals = response.Steals;

                $scope.FGPer = response.FGPer;
                $scope.threePPer = response.threePPer;
                $scope.FTPer = response.FTPer;
            })
        };

        /**
         * @summary Makes HTTP Call to get all season games. Calls buildAllGraphs() to create Charts from season games
         */
        var getSeasonGames = function () {
            var gamesURL = '/api/findGames/' + $scope.playerID;
            $http.get(gamesURL).success(function(response) {
                $scope.gamesPlayed = response;
                console.log('Another One:');
                console.log(response);

                buildAllGraphs();
            });
        };

        /**
         * @description Scope Function, triggered when user clicks 'Get Season Stats'. Calls function getSeasonStats() and getSeasonGames(). hideResults variable changed to false
         */
        $scope.displayResults = function(){
            //Display Results
            $scope.hideResults = false;
            //Get Player Stats
            getSeasonStats();

            //Get All Games played by player
            getSeasonGames();

        };

        /**
         * @description Builds all Stat Charts by callinng functions that control each stat chart. IE. pointsGraph() or reboundsGraph()
         */
        var buildAllGraphs = function(){
            // Build Points Charts
            pointsGraph();

            // Build FG Chart
            FGGraph();

            // Three Point Chart
            ThreePGraph();

            // Free Throw Chart
            FTGraph();

            // Assistd Chart
            AssistGraph();

            // Rebounds Chart
            ReboundsGraph();

            // Blocks Chart
            BlockGraph();

            // Steals Chart
            StealGraph();

            // TOV Chart
            TOVGraph();

            //Fouls Chart
            FoulGraph();
        };


        /*=====================================================
                        Chart Building Functions
          =====================================================
        */
        /**
         * @description Builds Points Graph. Assigns Graph to HTML div with ID PointsChart
         */
        var pointsGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
        //Points Chart
                    var data = new google.visualization.DataTable();

                    data.addColumn('string', 'Game Date');
                    data.addColumn('number', 'Points');

                    for (var i = 0; i < amountOfGames; i++) {
                        $scope.gameDay = 'G-'+i;
                        data.addRows([[$scope.gameDay, $scope.gamesPlayed[i].PTS]]);
                       // i++;
                    }

                    // Set Points Chart options
                    var options = {
                        'title': 'Points Per Game',
                        curveType: 'function',
                        animation: {startup: true}
                    };

                    // Instantiate and draw Points chart
                    var chart = new google.visualization.AreaChart(document.getElementById('PointsChart'));
                    chart.draw(data, options);
        };

        /**
         * @description Builds Field Goal Graph. Assigns Graph to HTML div with ID FGChart
         */
        var FGGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'FG %');

            for (var i = 0; i < amountOfGames; i++) {
                if($scope.gamesPlayed[i].FGA > 0) {
                    $scope.gameDay = 'G-' + i;
                    data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].FGM / $scope.gamesPlayed[i].FGA)]]);
                }
                else{
                    $scope.gameDay = 'G-' + i;
                    data.addRows([[$scope.gameDay, 0]]);
                }
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Field Goals Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('FGChart'));
            chart.draw(data, options);
        };

        /**
         * @description Builds Three Point Graph. Assigns Graph to HTML div with ID threePChart
         */
        var ThreePGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', '3P %');

            for (var i = 0; i < amountOfGames; i++) {
                if($scope.gamesPlayed[i].threes_attempted > 0) {
                    $scope.gameDay = 'G-' + i;
                    data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].threes_made / $scope.gamesPlayed[i].threes_attempted)]]);
                }
                else{
                    $scope.gameDay = 'G-' + i;
                    data.addRows([[$scope.gameDay, 0]]);
                }
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Three Point Percentage Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('threePChart'));
            chart.draw(data, options);
        };

        /**
         * @description Builds Free Throw Graph. Assigns Graph to HTML div with ID FTChart
         */
        var FTGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'FT %');

            for (var i = 0; i < amountOfGames; i++) {
                if($scope.gamesPlayed[i].FTA > 0) {
                    $scope.gameDay = 'G-' + i;
                    data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].FTM / $scope.gamesPlayed[i].FTA)]]);
                }
                else{
                    $scope.gameDay = 'G-' + i;
                    data.addRows([[$scope.gameDay, 0]]);
                }
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Free Throw Percentage Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('FTChart'));
            chart.draw(data, options);
        };

        /**
         * @description Builds Assist Graph. Assigns Graph to HTML div with ID AssistChart
         */
        var AssistGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'Assists');

            for (var i = 0; i < amountOfGames; i++) {
                $scope.gameDay = 'G-'+i;
                data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].AST)]]);
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Assists Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('AssistChart'));
            chart.draw(data, options);
        };

        /**
         * @description Builds Steal Graph. Assigns Graph to HTML div with ID StealChart
         */
        var StealGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'Steals');

            for (var i = 0; i < amountOfGames; i++) {
                $scope.gameDay = 'G-'+i;
                data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].STL)]]);
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Steals Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('StealChart'));
            chart.draw(data, options);
        };

        /**
         * @description Builds Block Graph. Assigns Graph to HTML div with ID BlockChart
         */
        var BlockGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'Blocks');

            for (var i = 0; i < amountOfGames; i++) {
                $scope.gameDay = 'G-'+i;
                data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].BLK)]]);
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Blocks Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('BlockChart'));
            chart.draw(data, options);
        };

        /**
         * @description Builds Rebound Graph. Assigns Graph to HTML div with ID TRBChart
         */
        var ReboundsGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'Offensive Rebounds');
            data.addColumn('number', 'Defensive Rebounds');

            for (var i = 0; i < amountOfGames; i++) {
                $scope.gameDay = 'G-'+i;
                data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].ORB), $scope.gamesPlayed[i].DRB]]);
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Rebounds Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('TRBChart'));
            chart.draw(data, options);
        };

        /**
         * @description Builds Turnover Graph. Assigns Graph to HTML div with ID TOVChart
         */
        var TOVGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'Turnovers');

            for (var i = 0; i < amountOfGames; i++) {
                $scope.gameDay = 'G-'+i;
                data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].TOV)]]);
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Steals Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('TOVChart'));
            chart.draw(data, options);
        };

        /**
         * @description Builds Foul Graph. Assigns Graph to HTML div with ID FoulChart
         */
        var FoulGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'Fouls');

            for (var i = 0; i < amountOfGames; i++) {
                $scope.gameDay = 'G-'+i;
                data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].Fouls)]]);
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Fouls Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('FoulChart'));
            chart.draw(data, options);
            $scope.hideResultsLoading = true;
        };

    }]);