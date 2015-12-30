var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seasonSchema = new Schema({
	associated_player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
	
	//General Season Information
	begin_year: Number,
	end_year:	Number,
	age:	Number,
	team:	String,
	player_pos:	String,
	games_played: Number,
	games_started:	Number,
	minutes_played:	Number
});

module.exports = mongoose.model("Season", seasonSchema);