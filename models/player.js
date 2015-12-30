var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
	//reference to team collection
	player_team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
	
	player_first_name:  String,
	player_last_name:	String,
	player_number: 	Number,
	player_position:	String,
	player_NBA_start:	Date,
	player_draft:	Number,
	player_preNBA_team:	String,
	player_birthDate:	Date,
	player_height:	Number,
	player_weight:	Number,
	player_salary:	Number,
	player_contract:	String,
	years_on_contract:	Number,
	
//player_status either: starter, bench, free-agent
	player_status:	String,
	//Monitor player injury status
	player_injured:	{type: Boolean, default: false},
		player_injury:	String,
		player_injury_time:	String,
//If player traded, show previous team		
		player_traded:	{type: Boolean, default: false},
		player_previousTeam: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Team'
		},
	
//If been to playoffs, use following data	
	been_to_playOffs:	{type: Boolean, default: false},
		playOff_experience: Number,
		playOff_appearances:	Number,
		playOff_win_percentage:	Number,
	//if been to finals, display following	
		been_to_finals:		{type: Boolean, default: false},
			finals_appearances: Number,
			finals_experience:	Number,
			finals_win_percentage:	Number,
			
			championships:	Number,
			finals_mvp:	Number,
			
	//Monitor rookie status	
	rookie_season: {type: Boolean, default: true},
	//Retirement Status
	is_Retired:	Boolean,
	//When player profile was created
	createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Player", playerSchema);