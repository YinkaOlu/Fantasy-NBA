/**
 * Created by yinka_000 on 2016-09-14.
 */
var app = angular.module('DreamsSquadsAngular', ['ngMaterial']);
app.service('TeamService', function ($http) {
    "ngInject";
    var mTeams;
    var roster;

    this.hello = function () {
        console.log('Database Service is Connected');
    };

    this.getTeams = $http.get('/api/team')
        .then(function(response){
            console.log('Got Team Response from Team Database');
            mTeams = response.data;
            console.log(response.data);
            return response.data;
    });

    this.getTeamURL= function(teamPos) {
        var selectedTeam = mTeams[teamPos];
        var teamID = selectedTeam._id;
        console.log(teamID);
        console.log(selectedTeam.team_name);
        var teamURL = '/api/findRoster/' + teamID;
        return teamURL;
    };

    this.getSelectedTeam = function (teamPos) {
        return mTeams[teamPos];
    };


});
/**
 * Created by yinka_000 on 2016-09-15.
 */


app.service('RosterService', function(){
    var roster;
    this.hello = function () {
        console.log('Roster Service');
    };

    this.getRoster = function (rosterInput) {
        roster = rosterInput;
        console.log('Roster Service Got Roster now');
        console.log(rosterInput);
    }

});

/**
 * @file Angular Javascript file that handles User interaction with Stat Gathering
 * @namespace Player Stat Angular App
 * @version 1.0
 */



app.controller('StatCtrl', function($scope, $http, TeamService, RosterService){
    console.log('Start');
    TeamService.hello();
    RosterService.hello();
    var numOfGames = 0;
        /*=====================================================
                    UI Controller Scope Variables
         =====================================================
         */

        /**
         * @memberof Player Stat Angular App
         * @description Variable that will determine if Results will show
         * @type {boolean}
         */
        $scope.hideResultsLoading = true;

        /**
         * @memberof Player Stat Angular App
         * @description Variable that will determine if NBA team list will show
         * @type {boolean}
         */
        $scope.hideTeams = false;
        /**
         * @memberof Player Stat Angular App
         * @description Variable that will determine if Roster of selected team will show
         * @type {boolean}
         */
        $scope.hideRoster = true;

        $scope.hidePersonalView = true;

        /**
         * @memberof Player Stat Angular App
         * @description HTTP Get request to recieve all NBA Teams, stored in $scope.currentTeams
         */

        /*=====================================================
                        List of NBA Teams
         =====================================================
         */

        // $http.get('/api/team').success(function(response){
        //     //Store DB as variable $scope.currentTeams
        //     $scope.currentTeams = response;
        // });
        var teamPromise = new Promise(function (resolve, reject) {
            var teams = TeamService.getTeams;
            if(teams){
                resolve(teams);
            } else{
                console.log('Error');
                reject(teams)
            }
        });

        teamPromise.then(function (result) {
            console.log('Response');
            console.log(result);
            $scope.currentTeams = result;
        });
        /**          * @memberof Player Stat Angular App
         * @description Variable that will determine if Results of Query will show
         * @type {boolean}
         */
        $scope.hideResults = true;

        /**          * @memberof Player Stat Angular App
         * @description Assigns a Selected team to $scope.selectedTeam
         * Long. teamPos is the position of the team in the NBA list. When function is run, selected team's id will be extracted & an HTTP Get call will be made to retrieve selected team's roster.
         * @param teamPos
         */

        /*=====================================================
                        Select Team from NBA List
         =====================================================
         */



        $scope.selectTeamFunction = function(teamPos) {

            $scope.selectedTeam = TeamService.getSelectedTeam(teamPos);
            $scope.teamID = $scope.selectedTeam._id;
            // console.log($scope.teamID);
            // console.log($scope.selectedTeam.team_name);
            // var teamURL = '/api/findRoster/' + $scope.teamID;

            $http.get(  TeamService.getTeamURL(teamPos) ).success(function(response){
                $scope.roster = response;
                RosterService.getRoster(response);
            });

            $scope.hideResults = true;
            $scope.hidePersonalView = true;
            $scope.hideTeams = true;
            $scope.hideRoster = false;

        };

        /**          * @memberof Player Stat Angular App
         * @description Extracted a selected player from selected team view players position in team roster array.
         * @param playerPos
         */



        /*=====================================================
                Scope Functions for specific stat display
         =====================================================
         */



        /*=====================================================
                Button Functions to Manage what Displays
         =====================================================
         */
        /**          * @memberof Player Stat Angular App
         * @description Hides Roster, Shows NBA team list
         */
        $scope.backToTeams = function(){
            $scope.hideTeams = false;
            $scope.hideRoster = true;
        };

        /**          * @memberof Player Stat Angular App
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

        /**          * @memberof Player Stat Angular App
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

        /**          * @memberof Player Stat Angular App
         * @description HTTP Get request to retrieves season stats of selected player. Assigns stats to scope variables
         */
        var getSeasonStats = function(){
            var statsURL = '/calculate/seasonStats/' + $scope.playerID;
            $http.get(statsURL).success(function(response) {
                console.log('These are the Season Stats: ');
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
                console.log('All Season Scope Variables are now set.');
            })
        };

        /**          * @memberof Player Stat Angular App
         * @summary Makes HTTP Call to get all season games. Calls buildAllGraphs() to create Charts from season games
         */
        var getSeasonGames = function () {
            var gamesURL = '/api/findGames/' + $scope.playerID;
            $http.get(gamesURL).success(function(response) {
                $scope.gamesPlayed = response;
                numOfGames = $scope.gamesPlayed.length;
                console.log('These are all the games played by selected player:');
                console.log(response);

                buildAllGraphs();
            });
        };

        /**          * @memberof Player Stat Angular App
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

        /**          * @memberof Player Stat Angular App
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
        /**          * @memberof Player Stat Angular App
         * @description Builds Points Graph. Assigns Graph to HTML div with ID PointsChart
         */
        var pointsGraph = function(){
            var amountOfGames = numOfGames;
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

        /**          * @memberof Player Stat Angular App
         * @description Builds Field Goal Graph. Assigns Graph to HTML div with ID FGChart
         */
        var FGGraph = function(){
            var amountOfGames = numOfGames;
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

        /**          * @memberof Player Stat Angular App
         * @description Builds Three Point Graph. Assigns Graph to HTML div with ID threePChart
         */
        var ThreePGraph = function(){
            var amountOfGames = numOfGames;
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

        /**          * @memberof Player Stat Angular App
         * @description Builds Free Throw Graph. Assigns Graph to HTML div with ID FTChart
         */
        var FTGraph = function(){
            var amountOfGames = numOfGames;
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

        /**          * @memberof Player Stat Angular App
         * @description Builds Assist Graph. Assigns Graph to HTML div with ID AssistChart
         */
        var AssistGraph = function(){
            var amountOfGames = numOfGames;
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

        /**          * @memberof Player Stat Angular App
         * @description Builds Steal Graph. Assigns Graph to HTML div with ID StealChart
         */
        var StealGraph = function(){
            var amountOfGames = numOfGames;
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

        /**          * @memberof Player Stat Angular App
         * @description Builds Block Graph. Assigns Graph to HTML div with ID BlockChart
         */
        var BlockGraph = function(){
            var amountOfGames = numOfGames;
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

        /**          * @memberof Player Stat Angular App
         * @description Builds Rebound Graph. Assigns Graph to HTML div with ID TRBChart
         */
        var ReboundsGraph = function(){
            var amountOfGames = numOfGames;
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

        /**          * @memberof Player Stat Angular App
         * @description Builds Turnover Graph. Assigns Graph to HTML div with ID TOVChart
         */
        var TOVGraph = function(){
            var amountOfGames = numOfGames;
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

        /**          * @memberof Player Stat Angular App
         * @description Builds Foul Graph. Assigns Graph to HTML div with ID FoulChart
         */
        var FoulGraph = function(){
            var amountOfGames = numOfGames;
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

    });
/**
 * Created by yinka_000 on 2016-09-14.
 */


app.controller('PlayerCtrl', function($scope, $http){
    console.log('Player Ctrl');

    /*=====================================================
     Select Player from Team Roster
     =====================================================
     */
    $scope.selectPlayerFunction = function(playerPos){
        $scope.player = $scope.roster[playerPos];
        $scope.playerID = $scope.player._id;
        console.log($scope.playerID);
        console.log($scope.player.player_first_name);
        $scope.height = $scope.getHeight(playerPos);
        $scope.hideResults = true;
        $scope.hidePersonalView = false;
        $scope.hideRoster = true;
    };

    /**          * @memberof Player Stat Angular App
     * @description Converts player height in inches to feet & inches, and return values
     * @param playerPos
     * @returns {string}
     */
    $scope.getHeight = function(playerPos){
        var player = $scope.roster[playerPos];
        var height = ''+Math.floor(player.player_height/12)+' ft '+(player.player_height%12)+' inches';
        return height;
    };

    /**          * @memberof Player Stat Angular App
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

    /**          * @memberof Player Stat Angular App
     * @description Return players health status
     * @param playerPos
     * @returns {*}
     */
    $scope.getPlayerStatus = function(playerPos){
        var player = $scope.roster[playerPos];
        var status = player.player_status;
        return status;
    };


});