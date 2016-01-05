/**
 * Created by yinka_000 on 2016-01-05.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fantasySchema = new Schema ({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },
    roster: {}
});

module.exports = mongoose.model("fantasyTeam", fantasySchema);