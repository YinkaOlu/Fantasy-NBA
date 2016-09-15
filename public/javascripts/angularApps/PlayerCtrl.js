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