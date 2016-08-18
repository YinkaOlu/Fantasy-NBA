/**
 * Created by yinka_000 on 2016-08-16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rosterSchema = new Schema({
    season: String,
    roster_team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    player_one: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_two: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_three: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_four: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_five: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_six: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_seven: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_eight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_nine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_ten: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_eleven: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_twelve: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    player_thirteen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
});

module.exports = mongoose.model("Roster", rosterSchema);