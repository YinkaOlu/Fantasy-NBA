/**
 * Created by Yinka on 2015-10-27.
 */



$(document).ready(function() {
	
	$('#teamsContainer').hide();
	$('#rosterContainer').hide();
	$('#CSVContainer').hide();
	$('#formContainer').hide();
	
	$('#DateContainer').click(function(e){
		$('#teamsContainer').fadeIn();
	});
	
	$('#teamsContainer').click(function(e){
		$('#rosterContainer').fadeIn();
		
	});
	
	$('#rosterContainer').click(function(e){
		$('#CSVContainer').fadeIn();
		$('#teamsContainer').fadeOut();
	});
	
	$('#CSVContainer').click(function(e){
		$('#formContainer').fadeIn();
	});
});