/**
 * Created by yolu on 12/31/2015.
 */
var app = angular.module('playerStatApp',[]);

app.controller('playerStatCtrl', ['$scope', '$http',
    function($scope, $http){
        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });

        $scope.hideResults = true;

        $scope.selectTeamFunction = function(teamPos) {
            $scope.selectedTeam = $scope.currentTeams[teamPos];
            $scope.teamID = $scope.currentTeams[teamPos]._id;
            console.log($scope.teamID);
            console.log($scope.selectedTeam.team_name);
            var teamURL = '/api/findRoster/' + $scope.teamID;
            $http.get(teamURL).success(function(response){
                $scope.roster = response;
            });
        };

        $scope.selectPlayerFunction = function(playerPos){
            $scope.player = $scope.roster[playerPos];
            $scope.playerID = $scope.player._id;
            console.log($scope.playerID);
            console.log($scope.player.player_first_name);
            $scope.height = ''+Math.floor($scope.player.player_height/12)+' ft '+($scope.player.player_height%12)+' inches';

        };

        $scope.displayResults = function(){

            //Get All Games played by player
            var playerURL = '/api/findGames/' + $scope.playerID;
            $http.get(playerURL).success(function(response) {
                $scope.gamesPlayed = response;

                //Calculate Season Stats
                $scope.seasonStats();

                // Build Points Charts
                $scope.pointsGraph();

                // Build FG Chart
                $scope.FGGraph();

                // Three Point Chart
                $scope.ThreePGraph();

                // Free Throw Chart
                $scope.FTGraph();

                // Assistd Chart
                $scope.AssistGraph();

                // Rebounds Chart
                $scope.ReboundsGraph();

                // Blocks Chart
                $scope.BlockGraph();

                // Steals Chart
                $scope.StealGraph();

                // TOV Chart
                $scope.TOVGraph();

                //Fouls Chart
                $scope.FoulGraph();

                //Display Results
                $scope.hideResults = false;
            });


        };

        $scope.seasonStats = function(){
            $scope.PPG = 0;
            $scope.APG = 0;
            $scope.FGPer = 0;
            $scope.BPG = 0;
            $scope.threePPer = 0;
            $scope.FTPer = 0;
            $scope.RPG = 0;
            $scope.TOV = 0;
            $scope.Fouls = 0;
            $scope.plusMinus = 0;
            $scope.MPG = 0;
            $scope.Steals = 0;

            $scope.FGM = 0;
            $scope.FGA = 0;

            $scope.TPA = 0;
            $scope.TPM = 0;

            $scope.FTA = 0;
            $scope.FTM = 0;


            var gamesPlayed = $scope.gamesPlayed.length;

            console.log(gamesPlayed);

            for (var i = 0; i < gamesPlayed; i++){
                $scope.PPG += $scope.gamesPlayed[i].PTS;
                $scope.APG += $scope.gamesPlayed[i].AST;
                $scope.RPG += ($scope.gamesPlayed[i].ORB + $scope.gamesPlayed[i].DRB);
                $scope.TOV += ($scope.gamesPlayed[i].TOV);
                $scope.Fouls += $scope.gamesPlayed[i].Fouls;
                $scope.BPG += $scope.gamesPlayed[i].BLK;
                $scope.plusMinus += $scope.gamesPlayed[i].plusMinus;
                $scope.MPG += $scope.gamesPlayed[i].minutes_played;
                $scope.Steals += $scope.gamesPlayed[i].STL;


                    $scope.FGM += ($scope.gamesPlayed[i].FGM);
                    $scope.FGA += ($scope.gamesPlayed[i].FGA);

                    $scope.TPA += ($scope.gamesPlayed[i].threes_attempted);
                    $scope.TPM += ($scope.gamesPlayed[i].threes_made);


                    $scope.FTA += ($scope.gamesPlayed[i].FTA);
                    $scope.FTM += ($scope.gamesPlayed[i].FTM);


            }

            $scope.PPG = ($scope.PPG / gamesPlayed);
            $scope.APG = ($scope.APG / gamesPlayed);
            $scope.RPG = ($scope.RPG / gamesPlayed);
            $scope.TOV = ($scope.TOV / gamesPlayed);
            $scope.Fouls = ($scope.Fouls / gamesPlayed);
            $scope.BPG = ($scope.BPG / gamesPlayed);
            $scope.plusMinus = ($scope.plusMinus / gamesPlayed);
            $scope.MPG = ($scope.MPG / gamesPlayed);
            $scope.Steals = ($scope.Steals / gamesPlayed);

            $scope.FGPer = ($scope.FGM / $scope.FGA);
            $scope.threePPer = ($scope.TPM / $scope.TPA);
            $scope.FTPer = ($scope.FTM / $scope.FTA);

        };

        $scope.pointsGraph = function(){
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

        $scope.FGGraph = function(){
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

        $scope.ThreePGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'FG %');

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

        $scope.FTGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'FG %');

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
                'title': 'Three Point Percentage Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('FTChart'));
            chart.draw(data, options);
        };

        $scope.AssistGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'FG %');

            for (var i = 0; i < amountOfGames; i++) {
                $scope.gameDay = 'G-'+i;
                data.addRows([[$scope.gameDay, ($scope.gamesPlayed[i].AST)]]);
                // i++;
            }

            // Set Points Chart options
            var options = {
                'title': 'Three Point Percentage Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('AssistChart'));
            chart.draw(data, options);
        };

        $scope.StealGraph = function(){
            var amountOfGames = $scope.gamesPlayed.length;
            //Points Chart
            var data = new google.visualization.DataTable();

            data.addColumn('string', 'Game Date');
            data.addColumn('number', 'FG %');

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

        $scope.BlockGraph = function(){
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
                'title': 'Blockss Per Game',
                curveType: 'function',
                animation: {startup: true}
            };

            // Instantiate and draw Points chart
            var chart = new google.visualization.AreaChart(document.getElementById('BlockChart'));
            chart.draw(data, options);
        };

        $scope.ReboundsGraph = function(){
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

        $scope.TOVGraph = function(){
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

        $scope.FoulGraph = function(){
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
        };



    }]);