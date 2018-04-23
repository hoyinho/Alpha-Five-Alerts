var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.get('/', function(req, res, next) {
	console.log("Idle Alerts start");
	var systemNames = db.get_All_Systems_Names("Hoyin");
    var sysNames = {};
	systemNames.then(function(systems){
	sysNames = ["Select a System"];
	console.log(systems);
	for (i = 0; i < systems["systems"].length; i++){
	    sysNames.push(systems["systems"][i]["companyName"]);
	}
	console.log("\n****THINGS HERE****\n" + sysNames);
	var alertsNames = db.get_All_Alerts("Hoyin");   
    alertsNames.then(function(alerts){
		console.log(alerts);
		console.log("\n****THINGS HERE****\n" + sysNames.length);
		var names = {};
		names = [["Select a System to view Alerts"]];
		for(i=1; i<sysNames.length;i++){
			names.push(["Temp"]);
		}
		for (i = 0; i < alerts["alerts"].length; i++){
			console.log("For loop");
			console.log("\n**SysName for alerts**" + alerts["alerts"][i]["systemName"] + "\n")
			names.push(alerts["alerts"][i]["alertName"]);
			console.log("Names length" + names.length +"\n");
		}
		console.log("For loop done");
	//temp = ["Select a System to view Alerts"] + temp;
	console.log(names);
	res.send(names);
	});
});
});
module.exports = router;