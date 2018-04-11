var mongoose = require('mongoose');

var userJson = new mongoose.Schema({
	username: String,
	password: String,
	alertIDs: []
});

var User = mongoose.model('User', userJson);

module.exports = User;