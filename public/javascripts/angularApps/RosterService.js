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
