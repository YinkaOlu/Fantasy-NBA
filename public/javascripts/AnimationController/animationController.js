/**
 * Created by Yinka on 2015-10-27.
 */



$(document).ready(function() {

        /* Tubular set uo for opening page*/

                        /* Video URL Array */
                        var videoArray = ['QzaYUOUXtT0', 'gTUhK-37wW8', 'Wr4_pMHqVlY', '8xoPsI2HWuU', 'pDsCvifI-Z8', 'VR0QMOwobuI', 'Ona5EVxmFVY', 'qr17ciywK1k', 'nIMHeZ03UjI', 'Ne2D2gl9eyw'];
                        var videoArraySize = videoArray.length;
                        var randomNum = Math.floor((Math.random() * videoArraySize));


                        $('#videoBackground').tubular({videoId:  videoArray[randomNum] }); // where idOfYourVideo is the YouTube ID.

//Hide TeamRoster div, personalView div, results div
        //Hide TeamRoster
        $('#teamRoster').hide();
        //Hide personalView
        $('#personalView').hide();
        //Hide Results div
        $('#careerResults').hide();
    //Hide Results div
    $('#currentResults').hide();

//Show Team Roster After clicking a Team
        $('#teamLogos').click(function(e) {
            if($('#teamRoster').is(":visible"))
            {
			    $('#teamRoster').fadeOut();
            }

            $('#teamRoster').fadeIn();
        });

//Show personal After clicking a player
        $('#teamRoster').click(function(){
            $('#personalView').show('slide');
        });
//Show results after clicking a Career button
    $('#careerStats').click(function(){
        alert('Career Stats');
        $('#careerResults').show();
        $('#currentResults').hide();

        // Toggle Tables
        $('#ShootingStatContainer').toggle('fast');
        $('#ShootBreakdown').toggle('fast');
        $('#ReboundingStat').toggle('fast');
        $('#AssistStat').toggle('fast');
        $('#StealStat').toggle('fast');
        $('#BlockStat').toggle('fast');
        $('#TurnoverStat').toggle('fast');
    });

//Show results after clicking a Seasons button
    $('#pastSeasons').click(function(){
        alert('Past Season Stats');
        $('#careerResults').show();
        $('#currentResults').hide();

        // Toggle Tables
        $('#ShootingStatContainer').toggle('fast');
        $('#ShootBreakdown').toggle('fast');
        $('#ReboundingStat').toggle('fast');
        $('#AssistStat').toggle('fast');
        $('#StealStat').toggle('fast');
        $('#BlockStat').toggle('fast');
        $('#TurnoverStat').toggle('fast');
    });

    //Show results after clicking a currentSeason button
    $('#currentSeason').click(function(){
        alert('Current Season Stats');
        $('#currentResults').show();
        $('#careerResults').hide();

        // Toggle Tables
        $('#ShootingStatContainer').toggle('fast');
        $('#ShootBreakdown').toggle('fast');
        $('#ReboundingStat').toggle('fast');
        $('#AssistStat').toggle('fast');
        $('#StealStat').toggle('fast');
        $('#BlockStat').toggle('fast');
        $('#TurnoverStat').toggle('fast');
    });

    //Show results after clicking a currentSeason button
    $('#lastTenDays').click(function(){
        alert('Last 2 Games');
        $('#currentResults').show();
        $('#careerResults').hide();

        // Toggle Tables
        $('#ShootingStatContainer').toggle('fast');
        $('#ShootBreakdown').toggle('fast');
        $('#ReboundingStat').toggle('fast');
        $('#AssistStat').toggle('fast');
        $('#StealStat').toggle('fast');
        $('#BlockStat').toggle('fast');
        $('#TurnoverStat').toggle('fast');
    });
    // Toggle Buttons


    //Toggle Shooting Stat Button
    $('#ShootingStatBtn').click(function(){
        $('#ShootingStatContainer').slideToggle('fast');
    });

    //Toggle ShootBreakdown Button
    $('#ShootBreakdownBtn').click(function(){
        $('#ShootBreakdown').slideToggle('fast');
    });

    //Toggle Rebounding Button
    $('#ReboundingStatBtn').click(function(){
        $('#ReboundingStat').slideToggle('fast');
    });

    //Toggle Assists Button
    $('#AssistStatBtn').click(function(){
        $('#AssistStat').slideToggle('fast');
    });
    //Toggle Steal Button
    $('#StealStatBtn').click(function(){
        $('#StealStat').slideToggle('fast');
    });
    //Toggle Block Button
    $('#BlockStatBtn').click(function(){
        $('#BlockStat').slideToggle('fast');
    });
    //Toggle Block Button
    $('#TurnoverStatBtn').click(function(){
        $('#TurnoverStat').slideToggle('fast');
    });

});
