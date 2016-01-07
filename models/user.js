var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    username: String,
    password: String,
    email: String,
    role: {type: String, default: 'basic'}
});

module.exports = mongoose.model("User", userSchema);