var mongoose = require('mongoose');

var alertSchema = new mongoose.Schema({
	alertName: String,
	alertThreshold: Number,
	alertField: String,
	alertID: Number
});

var Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;



