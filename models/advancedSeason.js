var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var advancedSeasonSchema = new Schema({
	player_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
	
	begin_year: Number,
	end_year:	Number,
	
	player_efficiency_rate: Number,
	offensive_rebound_percentage: Number,
	defensive_rebound_percentage:	Number,
	assist_percentage:	Number,
	steal_percentage:	Number,
	block_percentage:	Number,
	usage_percentage:	Number,
	win_share:	Number
	
});

module.exports = mongoose.model("AdvancedSeason", advancedSeasonSchema);