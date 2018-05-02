var mongoose = require('mongoose');

var systemSchema = new mongoose.Schema({
    serialnumberInserv: String,
    companyName: String,
    model: String,
    fullModel: String,
    osVersion: String,
    updated: String,
    capacity: {
	sizeTiB: Number,
	freeTiB: Number,
	freePct: Number,
	freePctZeroPredictedDate: String,
	failedCapacityTiB: Number
    },
    nodes: {
	cpuAvgMax: Number
    },
    Performance: {
	dataRateKBPSAvg: Number
    }
});

var alertSchema = new mongoose.Schema({
    alertName: String,
    alertThreshold: Number,
    alertField: String,
    systemName: String
});

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    alerts: [alertSchema],
    systems: [systemSchema]
});

var user = mongoose.model('user', userSchema);

module.exports = user;
