var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
	player_Name: String,
	associated_player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
	
	game_Date: Date,
	
	minutes_played: Number,
	FGM:	Number,
	FGA:	Number,
	threes_made: Number,
	threes_attempted:	Number,
	FTM:	Number,
	FTA:	Number,
	ORB:	Number,
	DRB:	Number,
	AST:	Number,
	STL:	Number,
	BLK:	Number,
	TOV:	Number,
	Fouls:	Number,
	PTS:	Number,
	plusMinus:	Number,
	
	//When game profile was created
	createdDate: { type: Date, default: Date.now }
	
});

module.exports = mongoose.model("Game", gameSchema);