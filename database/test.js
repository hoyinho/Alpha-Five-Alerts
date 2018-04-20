var mongoose = require("mongoose");


// test is the name of the database we want to connect to
// this can be anything you want
mongoose.connect('mongodb://localhost/test2');

var db = mongoose.connection;
var User = require("./user");
var System = require("./dbQuery");


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
    setTimeout(function(){
	System.create_Alert("Hoyin", "dataRateAlert", 6000, "dataRateKBPSAvg","6500228").then(function(user){
	    console.log(user);
	});
    System.create_System("Hoyin", '6820096', "Test2", "test model", "HPE_#STUFF", "0.0.0.0", "2018-04-17T16", 128.234123, 37.5432, 32.643211123,'2018-06-15T03:35:35z', 0.01534521, 12,3313).then(function(stuff){
	console.log(stuff);
    });
    System.create_System("Hoyin", "7601963", "Jason", "5100", "HPE-Jason 5100", "1.1.1.1", "2018-04-17", 127.234123, 111.33334, 43.5555, "2019-01-10T06:30:10z", 0.022212312, 16, 2562).then(function(stuff){
	console.log(stuff);
    });
    System.create_System("Hoyin", "7160363", "Billy", "Z10", "HPE-Billy Z10", "1.2.3.4", "2018-04-16", 131.4123, 67.33334, 15.345, "2018-10-23T12:23:23z", 0.022212312, 16, 2562).then(function(stuff){
	console.log(stuff);
    });
    }, 5000);
});

