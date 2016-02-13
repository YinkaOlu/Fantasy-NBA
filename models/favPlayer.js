/**
 * Created by yolu on 1/21/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favPlayerSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }
});

module.exports = mongoose.model("favPlayer", favPlayerSchema);