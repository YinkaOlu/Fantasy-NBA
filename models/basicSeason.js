var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var basicSeasonSchema = new Schema({
	player_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
	
	begin_year: Number,
	end_year:	Number,
	
	total_FGM:	Number,
	total_FGA:	Number,

	total_threes_made:	Number,
	total_threes_attempted:	Number,
	
	effective_FG_percentage:	Number,
	total_FTM:	Number,
	total_FTA:	Number,
	total_offensive_rebounds:	Number,
	total_defensive_rebounds:	Number,
	total_assists:	Number,
	total_steals:	Number,
	total_blocks:	Number,
	total_turnovers:	Number,
	total_fouls:	Number,
	total_points:	Number
	
	
});

module.exports = mongoose.model("BasicSeason", basicSeasonSchema);