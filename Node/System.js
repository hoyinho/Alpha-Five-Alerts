var mongoose = require('mongoose');

var systemSchema = new mongoose.Schema({
	serialnumberInserv: Number,
	companyName: String,
	model: String,
	fullModel: String,
	osVersion: String,
	updated: String,
	capacity: [{
		sizeTiB: Number,
		freeTiB: Number,
		freePct: Number,
		freePctZeroPredictedDate: Number,
		failedCapacityTib: Number,
	}],
	nodes: [{
		cpuAvgMax: Number,
	}],
	performance: {
		dataRateKBPSAvg: Number
	}
});

var System = mongoose.model('System', systemSchema);

module.exports = System;