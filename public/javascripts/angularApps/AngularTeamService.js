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