var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shootingSeasonSchema = new Schema({
	associated_player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
	
	begin_year: Number,
	end_year:	Number,
	
	average_shooting_distance:	Number,
	two_pointer_FGA_percentage:	Number,
	aroundTheRim_FGA_percentage:	Number,
	closeRange_FGA_percentage:	Number,
	midRange_FGA_percentage:	Number,
	longTwoPointer_FGA_percentage:	Number,
	three_pointer_FGA_percentage:	Number,
	
	two_pointer_FG_percentage:	Number,
	aroundTheRim_FG_percentage:	Number,
	closeRange_FG_percentage:	Number,
	midRange_FG_percentage:	Number,
	longTwoPointer_FG_percentage:	Number,
	three_pointer_FG_percentage:	Number
	
	
});

module.exports = mongoose.model("ShootingSeason", shootingSeasonSchema);