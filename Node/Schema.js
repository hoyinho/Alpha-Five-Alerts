var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	alertIDs: [],
	systemSerialNumbers: []
});

var User = mongoose.model('User', userSchema);

var alertSchema = new mongoose.Schema({
	alertName: String,
	alertThreshold: Number,
	alertField: String,
	alertID: Number
});

var Alert = mongoose.model('Alert', alertSchema);

var systemSchema = new mongoose.Schema({
	serialnumberInserv: Number,
	companyName: String,
	model: String,
	fullModel: String,
	osVersion: String,
	updated: String,
	sizeTiB: Number,
	freeTiB: Number,
	freePct: Number,
	freePctZeroPredictedDate: Number,
	failedCapacityTib: Number,
	cpuAvgMax: Number,
	dataRateKBPSAvg: Number
});

var System = mongoose.model('System', systemSchema);

module.exports = {
	User,
	Alert,
	System
}