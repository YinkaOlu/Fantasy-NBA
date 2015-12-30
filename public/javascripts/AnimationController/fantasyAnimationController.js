/**
 * Created by Yinka on 2015-11-07.
 */
$(document).ready(function() {

    // Hide selection menus

    $('#fantasySelectPartial').hide();
    $('#fantasyStatFinder').hide();
    $('#fantasyTeamResults').hide();

    //Hide player selection btn
    $('#formTwoContainer').hide();

    //Toggle bench when starting player selected
    $('#startingFiveContainer').click(function(){
        $('#benchContainer').toggle('fold');
        $('#fantasySelectPartial').toggle('fold');
    })

    //Toggle Color of div, when position selected-deselected
    $('.fantasyPosHolder').click(function(){
        $(this).toggleClass('selectedFantasyPos');
    })


    $('#benchContainer').click(function(){
        $('#fantasySelectPartial').toggle('fold');
    })


    //Show play selection after picking team
    $('#formOneContainer').click(function(){
        $('#formTwoContainer').fadeIn();
    })

    //After Player selected, show either bench or starting 5
    $('#addFantasyPlayerBtn').click(function(){
        $('#fantasySelectPartial').fadeOut();
        $('#formTwoContainer').fadeOut();
        $('.selectedFantasyPos').toggleClass('selectedFantasyPos');

            $('#benchContainer').show('fold');



    })

    //Show Game Range Selection when Build Team button pressed
    $('#buildTeamBtn').click(function(){
        $('#fantasyStatFinder').fadeIn();
    });

    $('#getFantasyStat').click(function(){
        $('#fantasyTeamResults').fadeIn();
    });



});