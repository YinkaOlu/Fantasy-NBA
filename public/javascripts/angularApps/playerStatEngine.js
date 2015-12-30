/**
 * Created by yinka_000 on 2015-10-21.
 */
var app = angular.module('playerStatEngine',[]);

app.controller('playerStatApp', ['$scope', '$http',
    function($scope, $http){
        //DB Call to currentNBA, Retrieve DB Content
        $http.get('/api/team').success(function(response){
            //Store DB as variable $scope.currentTeams
            $scope.currentTeams = response;
        });



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
            var playerURL = '/api/findGames/' + $scope.playerID;
            $http.get(playerURL).success(function(response) {
                $scope.gamesPlayed = response;
            })
        };

$scope.careerStats = function(){

    var selectedPlayer = $scope.selectedPlayer;
    $scope.selectedPlayerPic = selectedPlayer.player_profile;
    $scope.profile_location = selectedPlayer.player_profile;
    $scope.currentTeam = selectedPlayer.current_team ;
    $scope.player_name = selectedPlayer.player_name;
    $scope.birth_date = selectedPlayer.birth_date;
    $scope.player_pos = selectedPlayer.position;
    $scope.player_height = selectedPlayer.height_inches;
    $scope.player_draftYear = selectedPlayer.draft_year;


    var tempGames_played = 0;
    var tempGames_started = 0;
    var tempMinutes_played = 0;
    var tempFGM = 0;
    var tempFGA = 0;
    var tempThreePM = 0;
    var tempThreePA = 0;
    var tempTwoPM = 0;
    var tempTwoPA = 0;

    var tempFTM = 0;
    var tempFTA = 0;
    var tempORB = 0;
    var tempDRB = 0;
    var tempAssists = 0;
    var tempSteals = 0;
    var tempBlocks = 0;
    var tempTurnovers = 0;
    var tempPoints = 0;


    var counter = 0;
    for(var i = 0; i < selectedPlayer.seasons.length; i++){

        //Basic Stats
        if(selectedPlayer.seasons[i].team != "TOT" && selectedPlayer.seasons[i].team.length < 4 ) {

            tempGames_played += selectedPlayer.seasons[i].games_played;
            tempGames_started += selectedPlayer.seasons[i].games_started;
            tempMinutes_played = tempMinutes_played + selectedPlayer.seasons[i].MinutesPlayed;
            tempFGM += selectedPlayer.seasons[i].FGM;
            tempFGA += selectedPlayer.seasons[i].FGA;
            tempThreePM += selectedPlayer.seasons[i].ThreePM;
            tempThreePA += selectedPlayer.seasons[i].ThreePA;
            tempTwoPM += selectedPlayer.seasons[i].TwoPM;
            tempTwoPA += selectedPlayer.seasons[i].TwoPA;

            tempFTM += selectedPlayer.seasons[i].FTM;
            tempFTA += selectedPlayer.seasons[i].FTA;
            tempORB += selectedPlayer.seasons[i].totalORB;
            tempDRB += selectedPlayer.seasons[i].TotalDRB;
            tempAssists += selectedPlayer.seasons[i].totalAssists;
            tempSteals += selectedPlayer.seasons[i].totalSteals;
            tempBlocks += selectedPlayer.seasons[i].totalBlocks;
            tempTurnovers += selectedPlayer.seasons[i].totalTurnover;
            tempPoints += selectedPlayer.seasons[i].totalPoints;

            counter++;
        }
    }

    //Scoring Stats
    $scope.tPoints = tempPoints;
    $scope.PPG = (tempPoints/tempGames_played).toFixed(2);
    //FG Stats
    $scope.tFGM = tempFGM;
    $scope.tFGA = tempFGA;
    $scope.FGPer = (tempFGM/tempFGA).toFixed(2);
    //3PT Stats
    $scope.tThreePM = tempThreePM;
    $scope.tThreePA = tempThreePA;
    $scope.ThreePPer = (tempThreePM/tempThreePA).toFixed(2);
    //2PT Stats
    $scope.tTwoPM = tempTwoPM;
    $scope.tTwoPA = tempTwoPA;
    $scope.TwoPPer = (tempTwoPM/tempTwoPA).toFixed(2);

    //Free throw Stat
    $scope.tFTM = tempFTM;
    $scope.tFTA = tempFTA;
    $scope.FTPer = (tempFTM/tempFTA).toFixed(2);
    //Rebound
    $scope.tORB = tempORB;
    $scope.tDRB = tempDRB;
    $scope.tRB = tempORB + tempDRB;

    $scope.ORPG = (tempORB/tempGames_played).toFixed(2);
    $scope.DRPG = (tempDRB/tempGames_played).toFixed(2);
    $scope.RPG = ($scope.tRB/tempGames_played).toFixed(2);
    //Assists
    $scope.tAssists = tempAssists;
    $scope.APG = (tempAssists/tempGames_played).toFixed(2);
    //Steals
    $scope.tSteals = tempSteals;
    $scope.SPG = (tempSteals/tempGames_played).toFixed(2);
    //Blocks
    $scope.tBlocks = tempBlocks;
    $scope.BPG = (tempBlocks/tempGames_played).toFixed(2);
    //TurnOvers
    $scope.tTurnovers = tempTurnovers;
    $scope.TPG = (tempTurnovers/tempGames_played).toFixed(2);




    //Shooting Breakdown

    var DistAvg = 0;
    var TwoFGAPer = 0;
    var AroundTheRimFGAPer = 0;
    var CloseRangeShootingFGAPer = 0;
    var MidRangeShootingFGAPer = 0;
    var Long2PtFGAPer = 0;
    var ThreePFGAPer = 0;
    var AroundTheRimPER = 0;
    var CloseRangeShootingPER = 0;
    var MidRangeShootingPER = 0;
    var Long2PtPER = 0;

    var sCounter = 0;

    for(var i = 0; i < selectedPlayer.seasons.length; i++){

        //Shooting Breakdown Loop
        if(selectedPlayer.seasons[i].team != "TOT" && selectedPlayer.seasons[i].team.length < 4 ) {
            DistAvg += selectedPlayer.seasons[i].DistAvg;
            TwoFGAPer += selectedPlayer.seasons[i].TwoFGAPer;
            AroundTheRimFGAPer += selectedPlayer.seasons[i].AroundTheRimFGAPer;
            CloseRangeShootingFGAPer += selectedPlayer.seasons[i].CloseRangeShootingFGAPer;
            MidRangeShootingFGAPer += selectedPlayer.seasons[i].MidRangeShootingFGAPer;
            Long2PtFGAPer += selectedPlayer.seasons[i].Long2PtFGAPer;
            ThreePFGAPer += selectedPlayer.seasons[i].ThreePFGAPer;
            AroundTheRimPER += selectedPlayer.seasons[i].AroundTheRimPER;
            CloseRangeShootingPER += selectedPlayer.seasons[i].CloseRangeShootingPER;
            MidRangeShootingPER += selectedPlayer.seasons[i].MidRangeShootingPER;
            Long2PtPER += selectedPlayer.seasons[i].Long2PtPER;

            sCounter++;
        }
    }

    $scope.DistAvg = (DistAvg/sCounter).toFixed(2);
    $scope.TwoFGAPer = (TwoFGAPer/sCounter).toFixed(2);
    $scope.AroundTheRimFGAPer = (AroundTheRimFGAPer/sCounter).toFixed(2);
    $scope.CloseRangeShootingFGAPer = (CloseRangeShootingFGAPer/sCounter).toFixed(2);
    $scope.MidRangeShootingFGAPer = (MidRangeShootingFGAPer/sCounter).toFixed(2);
    $scope.Long2PtFGAPer = (Long2PtFGAPer/sCounter).toFixed(2);
    $scope.ThreePFGAPer = (ThreePFGAPer/sCounter).toFixed(2);
    $scope.AroundTheRimPER = (AroundTheRimPER/sCounter).toFixed(2);
    $scope.CloseRangeShootingPER = (CloseRangeShootingPER/sCounter).toFixed(2);
    $scope.MidRangeShootingPER = (MidRangeShootingPER/sCounter).toFixed(2);
    $scope.Long2PtPER = (Long2PtPER/sCounter).toFixed(2);

    // Field Goal Attempt Percentage Graph Creation
    var FGAPer = [
        {
            value: $scope.AroundTheRimFGAPer*100,
            label: 'Around the Rim (0-3 Feet from basket)',
            color:"#E26A6A",
            highlight: "#F4B350",
        },
        {
            value: $scope.CloseRangeShootingFGAPer*100,
            label: 'Close Range Shooting (3-10 Feet from basket)',
            color: "#9B59B6",
            highlight: "#F4B350",
        },
        {
            value: $scope.MidRangeShootingFGAPer*100,
            label: 'Mid-Range Shooting (10-16 Feet from basket)',
            color: "#5C97BF",
            highlight: "#F4B350",
        },
        {
            value: $scope.Long2PtFGAPer*100,
            label: 'Long Range 2-Pt Shoot (16 Feet to 3Pt line',
            color:"#4DAF7C",
            highlight: "#F4B350",
        },
        {
            value : $scope.ThreePFGAPer*100,
            label: 'Three Pointer',
            color: "#F2784B",
            highlight: "#F4B350",
        }
    ];
    var FGAPie = document.getElementById('FGAPer').getContext('2d');
    var skillsChart = new Chart(FGAPie).Doughnut(FGAPer, {percentageInnerCutout : 75});

    // Field Goal Percentage Graph Creation
    var FGPer = {
        labels: ["Around the Rim (0-3 Feet from basket)", "Close Range Shooting (3-10 Feet from basket)", "Mid-Range Shooting (10-16 Feet from basket)", "Long Range 2-Pt Shoot (16 Feet to 3Pt line", "Three Pointer"],
        datasets: [
            {
                label: "Field Goal Percentage by Shooting range",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [
                    $scope.AroundTheRimPER,
                    $scope.CloseRangeShootingPER,
                    $scope.MidRangeShootingPER,
                    $scope.Long2PtPER,
                    $scope.ThreePPer
                ]
            }
        ]
    };
    var FGPie = document.getElementById('FGPer').getContext('2d');
    var skillsChart = new Chart(FGPie).Line(FGPer);


};

// Season Stats Calculator
        $scope.previousSeasonStats = function(selectedSeason){

            var selectedPlayer = $scope.selectedPlayer;
            $scope.selectedPlayerPic = selectedPlayer.player_profile;
            $scope.profile_location = selectedPlayer.player_profile;
            $scope.currentTeam = selectedPlayer.current_team ;
            $scope.player_name = selectedPlayer.player_name;
            $scope.birth_date = selectedPlayer.birth_date;
            $scope.player_pos = selectedPlayer.position;
            $scope.player_height = selectedPlayer.height_inches;
            $scope.player_draftYear = selectedPlayer.draft_year;


            var tempGames_played = 0;
            var tempGames_started = 0;
            var tempMinutes_played = 0;
            var tempFGM = 0;
            var tempFGA = 0;
            var tempThreePM = 0;
            var tempThreePA = 0;
            var tempTwoPM = 0;
            var tempTwoPA = 0;

            var tempFTM = 0;
            var tempFTA = 0;
            var tempORB = 0;
            var tempDRB = 0;
            var tempAssists = 0;
            var tempSteals = 0;
            var tempBlocks = 0;
            var tempTurnovers = 0;
            var tempPoints = 0;



            tempGames_played = selectedPlayer.seasons[selectedSeason].games_played;
            tempGames_started = selectedPlayer.seasons[selectedSeason].games_started;
            tempMinutes_played = tempMinutes_played + selectedPlayer.seasons[selectedSeason].MinutesPlayed;
            tempFGM = selectedPlayer.seasons[selectedSeason].FGM;
            tempFGA = selectedPlayer.seasons[selectedSeason].FGA;
            tempThreePM = selectedPlayer.seasons[selectedSeason].ThreePM;
            tempThreePA = selectedPlayer.seasons[selectedSeason].ThreePA;
            tempTwoPM = selectedPlayer.seasons[selectedSeason].TwoPM;
            tempTwoPA = selectedPlayer.seasons[selectedSeason].TwoPA;

            tempFTM = selectedPlayer.seasons[selectedSeason].FTM;
            tempFTA = selectedPlayer.seasons[selectedSeason].FTA;
            tempORB = selectedPlayer.seasons[selectedSeason].totalORB;
            tempDRB = selectedPlayer.seasons[selectedSeason].TotalDRB;
            tempAssists = selectedPlayer.seasons[selectedSeason].totalAssists;
            tempSteals = selectedPlayer.seasons[selectedSeason].totalSteals;
            tempBlocks = selectedPlayer.seasons[selectedSeason].totalBlocks;
            tempTurnovers = selectedPlayer.seasons[selectedSeason].totalTurnover;
            tempPoints = selectedPlayer.seasons[selectedSeason].totalPoints;




            //Scoring Stats
            $scope.tPoints = tempPoints;
            $scope.PPG = (tempPoints/tempGames_played).toFixed(2);
            //FG Stats
            $scope.tFGM = tempFGM;
            $scope.tFGA = tempFGA;
            $scope.FGPer = (tempFGM/tempFGA).toFixed(2);
            //3PT Stats
            $scope.tThreePM = tempThreePM;
            $scope.tThreePA = tempThreePA;
            $scope.ThreePPer = (tempThreePM/tempThreePA).toFixed(2);
            //2PT Stats
            $scope.tTwoPM = tempTwoPM;
            $scope.tTwoPA = tempTwoPA;
            $scope.TwoPPer = (tempTwoPM/tempTwoPA).toFixed(2);

            //Free throw Stat
            $scope.tFTM = tempFTM;
            $scope.tFTA = tempFTA;
            $scope.FTPer = (tempFTM/tempFTA).toFixed(2);
            //Rebound
            $scope.tORB = tempORB;
            $scope.tDRB = tempDRB;
            $scope.tRB = tempORB + tempDRB;

            $scope.ORPG = (tempORB/tempGames_played).toFixed(2);
            $scope.DRPG = (tempDRB/tempGames_played).toFixed(2);
            $scope.RPG = ($scope.tRB/tempGames_played).toFixed(2);
            //Assists
            $scope.tAssists = tempAssists;
            $scope.APG = (tempAssists/tempGames_played).toFixed(2);
            //Steals
            $scope.tSteals = tempSteals;
            $scope.SPG = (tempSteals/tempGames_played).toFixed(2);
            //Blocks
            $scope.tBlocks = tempBlocks;
            $scope.BPG = (tempBlocks/tempGames_played).toFixed(2);
            //TurnOvers
            $scope.tTurnovers = tempTurnovers;
            $scope.TPG = (tempTurnovers/tempGames_played).toFixed(2);




            //Shooting Breakdown

            var DistAvg = 0;
            var TwoFGAPer = 0;
            var AroundTheRimFGAPer = 0;
            var CloseRangeShootingFGAPer = 0;
            var MidRangeShootingFGAPer = 0;
            var Long2PtFGAPer = 0;
            var ThreePFGAPer = 0;
            var AroundTheRimPER = 0;
            var CloseRangeShootingPER = 0;
            var MidRangeShootingPER = 0;
            var Long2PtPER = 0;


            DistAvg = selectedPlayer.seasons[selectedSeason].DistAvg;
            TwoFGAPer = selectedPlayer.seasons[selectedSeason].TwoFGAPer;
            AroundTheRimFGAPer = selectedPlayer.seasons[selectedSeason].AroundTheRimFGAPer;
            CloseRangeShootingFGAPer = selectedPlayer.seasons[selectedSeason].CloseRangeShootingFGAPer;
            MidRangeShootingFGAPer = selectedPlayer.seasons[selectedSeason].MidRangeShootingFGAPer;
            Long2PtFGAPer = selectedPlayer.seasons[selectedSeason].Long2PtFGAPer;
            ThreePFGAPer = selectedPlayer.seasons[selectedSeason].ThreePFGAPer;
            AroundTheRimPER = selectedPlayer.seasons[selectedSeason].AroundTheRimPER;
            CloseRangeShootingPER = selectedPlayer.seasons[selectedSeason].CloseRangeShootingPER;
            MidRangeShootingPER = selectedPlayer.seasons[selectedSeason].MidRangeShootingPER;
            Long2PtPER = selectedPlayer.seasons[selectedSeason].Long2PtPER;



            $scope.DistAvg = (DistAvg).toFixed(2);
            $scope.TwoFGAPer = (TwoFGAPer).toFixed(2);
            $scope.AroundTheRimFGAPer = (AroundTheRimFGAPer).toFixed(2);
            $scope.CloseRangeShootingFGAPer = (CloseRangeShootingFGAPer).toFixed(2);
            $scope.MidRangeShootingFGAPer = (MidRangeShootingFGAPer).toFixed(2);
            $scope.Long2PtFGAPer = (Long2PtFGAPer).toFixed(2);
            $scope.ThreePFGAPer = (ThreePFGAPer).toFixed(2);
            $scope.AroundTheRimPER = (AroundTheRimPER).toFixed(2);
            $scope.CloseRangeShootingPER = (CloseRangeShootingPER).toFixed(2);
            $scope.MidRangeShootingPER = (MidRangeShootingPER).toFixed(2);
            $scope.Long2PtPER = (Long2PtPER).toFixed(2);

            // Field Goal Attempt Percentage Graph Creation
            var FGAPer = [
                {
                    value: $scope.AroundTheRimFGAPer*100,
                    label: 'Around the Rim (0-3 Feet from basket)',
                    color:"#E26A6A",
                    highlight: "#F4B350",
                },
                {
                    value: $scope.CloseRangeShootingFGAPer*100,
                    label: 'Close Range Shooting (3-10 Feet from basket)',
                    color: "#9B59B6",
                    highlight: "#F4B350",
                },
                {
                    value: $scope.MidRangeShootingFGAPer*100,
                    label: 'Mid-Range Shooting (10-16 Feet from basket)',
                    color: "#5C97BF",
                    highlight: "#F4B350",
                },
                {
                    value: $scope.Long2PtFGAPer*100,
                    label: 'Long Range 2-Pt Shoot (16 Feet to 3Pt line',
                    color:"#4DAF7C",
                    highlight: "#F4B350",
                },
                {
                    value : $scope.ThreePFGAPer*100,
                    label: 'Three Pointer',
                    color: "#F2784B",
                    highlight: "#F4B350",
                }
            ];
            var FGAPie = document.getElementById('FGAPer').getContext('2d');
            var skillsChart = new Chart(FGAPie).Doughnut(FGAPer, {percentageInnerCutout : 75});

            // Field Goal Percentage Graph Creation
            var FGPer = {
                labels: ["Around the Rim (0-3 Feet from basket)", "Close Range Shooting (3-10 Feet from basket)", "Mid-Range Shooting (10-16 Feet from basket)", "Long Range 2-Pt Shoot (16 Feet to 3Pt line", "Three Pointer"],
                datasets: [
                    {
                        label: "Field Goal Percentage by Shooting range",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [
                            $scope.AroundTheRimPER,
                            $scope.CloseRangeShootingPER,
                            $scope.MidRangeShootingPER,
                            $scope.Long2PtPER,
                            $scope.ThreePPer
                        ]
                    }
                ]
            };
            var FGPie = document.getElementById('FGPer').getContext('2d');
            var skillsChart = new Chart(FGPie).Line(FGPer);


        };

        //Previous Game Stat Calculator, user input game range

        $scope.previousGames = function(gameRange){
            var selectedPlayer = $scope.selectedPlayer;


            if(gameRange == 'season'){
                gameRange = selectedPlayer.currentSeasonGames.length - selectedPlayer.currentSeasonGames.length;
            }
            else{

            gameRange = selectedPlayer.currentSeasonGames.length - (gameRange);
            }



            var selectedPlayer = $scope.selectedPlayer;
            $scope.selectedPlayerPic = selectedPlayer.player_profile;
            $scope.profile_location = selectedPlayer.player_profile;
            $scope.currentTeam = selectedPlayer.current_team ;
            $scope.player_name = selectedPlayer.player_name;
            $scope.birth_date = selectedPlayer.birth_date;
            $scope.player_pos = selectedPlayer.position;
            $scope.player_height = selectedPlayer.height_inches;
            $scope.player_draftYear = selectedPlayer.draft_year;

            var game_Num = 0;
            var game_Date = 0;
            var opponent = 0;
            var game_Status = 0;
            var started_Game = 0;
            var minutes_Played = 0;
            var FGM = 0;
            var FGA = 0;
            var FGPer = 0;
            var threePM = 0;
            var threePA = 0;
            var threePPer = 0;
            var FTM = 0;
            var FTA = 0;
            var FTPer = 0;
            var ORB = 0;
            var DRB = 0;
            var TRB = 0;
            var assists = 0;
            var steals = 0;
            var blocks = 0;
            var TOV = 0;
            var fouls = 0;
            var points = 0;
            var game_Score = 0;
            var plusMinus = 0;
            var DFS = 0;



            var counter = 0;

            //Make Sure user input is within range of played Games
            if(gameRange > selectedPlayer.currentSeasonGames.length)
            {
                gameRange = selectedPlayer.currentSeasonGames.length;
            }



            for(var i = gameRange; i < (selectedPlayer.currentSeasonGames.length); i++){

                //Basic Stats
                game_Num+= selectedPlayer.currentSeasonGames[i].game_Num ;
                game_Date+= selectedPlayer.currentSeasonGames[i].game_Date;
                opponent+= selectedPlayer.currentSeasonGames[i].opponent ;
                game_Status+= selectedPlayer.currentSeasonGames[i].game_Status ;
                started_Game+= selectedPlayer.currentSeasonGames[i].started ;
                minutes_Played+= selectedPlayer.currentSeasonGames[i].minutes_Played ;
                FGM+= selectedPlayer.currentSeasonGames[i].FGM ;
                FGA+= selectedPlayer.currentSeasonGames[i].FGA ;
                FGPer+= selectedPlayer.currentSeasonGames[i].FGPer ;
                threePM+= selectedPlayer.currentSeasonGames[i].threePM ;
                threePA+= selectedPlayer.currentSeasonGames[i].threePA ;
                threePPer+= selectedPlayer.currentSeasonGames[i].threePPer ;
                FTM+= selectedPlayer.currentSeasonGames[i].FTM ;
                FTA+= selectedPlayer.currentSeasonGames[i].FTA ;
                FTPer+= selectedPlayer.currentSeasonGames[i].FTPer ;
                ORB+= selectedPlayer.currentSeasonGames[i].ORB ;
                DRB+= selectedPlayer.currentSeasonGames[i].DRB ;
                TRB+= selectedPlayer.currentSeasonGames[i].TRB ;
                assists+= selectedPlayer.currentSeasonGames[i].assists ;
                steals+= selectedPlayer.currentSeasonGames[i].steals ;
                blocks+= selectedPlayer.currentSeasonGames[i].blocks ;
                TOV+= selectedPlayer.currentSeasonGames[i].TOV ;
                fouls+= selectedPlayer.currentSeasonGames[i].fouls ;
                points+= selectedPlayer.currentSeasonGames[i].points ;
                game_Score+= selectedPlayer.currentSeasonGames[i].game_Score ;
                plusMinus+= selectedPlayer.currentSeasonGames[i].plusMinus ;
                DFS+=selectedPlayer.currentSeasonGames[i].DFS ;

                counter++;

            }


            $scope.counter = counter;
            $scope.game_Num = game_Num;
            $scope.game_Date = game_Date;
            $scope.opponent = opponent;
            $scope.game_Status = game_Status;
            $scope.started_Game = started_Game;
            $scope.minutes_Played = minutes_Played;
            $scope.MPG = (minutes_Played/counter).toFixed(2);
            $scope.aFGM = (FGM/counter).toFixed(2);
            $scope.aFGA = (FGA/counter).toFixed(2);
            $scope.aFGPer = (FGPer/counter).toFixed(2);
            $scope.athreePM = (threePM/counter).toFixed(2);
            $scope.athreePA = (threePA/counter).toFixed(2);
            $scope.athreePPer = (threePPer/counter).toFixed(2);
            $scope.aFTM = (FTM/counter).toFixed(2);
            $scope.aFTA = (FTA/counter).toFixed();
            $scope.aFTPer = (FTPer/counter).toFixed(2);
            $scope.ORB = (ORB/counter).toFixed(2);
            $scope.DRB = (DRB/counter).toFixed(2);
            $scope.TRB = (TRB/counter).toFixed(2);
            $scope.APG = (assists/counter).toFixed(2);
            $scope.SPG = (steals/counter).toFixed(2);
            $scope.BPG = (blocks/counter).toFixed();
            $scope.TPG = (TOV/counter).toFixed(2);
            $scope.FPG = (fouls/counter).toFixed(2);
            $scope.PPG = (points/counter).toFixed(2);
            $scope.game_Score = game_Score;
            $scope.plusMinus = plusMinus;
            $scope.DFS = (DFS/counter).toFixed(2);





        };


}]);