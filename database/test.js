var mongoose = require("mongoose");


// test is the name of the database we want to connect to
// this can be anything you want
mongoose.connect('mongodb://localhost/test2');

var db = mongoose.connection;
var User = require("./user");
var System = require("./system");

// connection error
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('we are connected!');

    User.create({
	username: "Hoyin",
	password: "password123",
	alerts: [],
	systems: [{
	    serialnumberInserv: "6500228",
	    companyName: "Raza",
	    model: "8450",
	    fullModel: "HPE_#PAR 8450",
	    osVersion: "3.3.1.2",
	    updated: "2018-02-08T16",
	    capacity: {
		sizeTiB: 111.6953125,
		freeTiB: 36.6948383,
		freePct: 32.95837495928,
		freePctZeroPredictedDate: "2018-06-15T03:35:35Z",
		failedCapacityTiB: 0.0205078125
	    },
	    nodes: {
		cpuAvgMax: 16
	    },
	    Performance: {
		dataRateKBPSAvg: 3396
	    }
	}]
    }).then(function(savedUser) {
	console.log("We saved this usesr!", savedUser);
    }).catch(function(error){
	console.error(error);
    });
    create_Alert("Hoyin", "dataRateAlert", 6000, "dataRateKBPSAvg").then(function(user){
	console.log(user);
    });
});

