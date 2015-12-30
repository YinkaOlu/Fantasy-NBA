var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
	team_name:  String,
	arena: 	String,
	
	city:	String,
	State:	String,
	country:	String,
	
	conference:	String,
	division:	String,
	
	head_coach:  String,
	GM:	String,
	owner:	String,
	
	playoff_appearances: Number,
	finals_appearances:	Number,
	championships:	Number,
	historical_win_percentage:	Number,
	
	teamPrimaryColour: 	String,
	teamSecondaryColour: String,
	teamTertiaryColour: String,
	
	currentSeason_wins:	Number,
	currentSeason_losses:	Number,
	total_Salary:	Number,
	
	createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Team", teamSchema);