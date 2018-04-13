var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	alertIDs: Array,
	systemSerialNumbers: Array
});

var User = mongoose.model('User', userSchema);


module.exports = User;
