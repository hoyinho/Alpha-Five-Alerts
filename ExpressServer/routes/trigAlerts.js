var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.get('/', function(req, res, next) {
	console.log("*****************************Trig Alerts start*****************************");
	var systemNames = db.get_All_Systems_Names("Hoyin");
    systemNames.then(function(systems){
	var sysNames = {};
	sysNames = ["Select a System"];
	for (i = 0; i < systems["systems"].length; i++){
	    sysNames.push(systems["systems"][i]["companyName"]);
	}
	console.log(sysNames);
	var alertsNames = db.get_All_Alerts("Hoyin");   
    alertsNames.then(function(alerts){
		console.log("\n***Result of get_all_alerts***\n");
		console.log(alerts);
		console.log("\n***Result of get_all_alerts[0]***\n");
		console.log(alerts[0]);
		console.log("\n***Result of get_all_alerts[1]***\n");
		console.log(alerts[1]);
		console.log("\n***Result of get_all_alerts[2]***\n");
		console.log(alerts[2]);
		var names = {};
		names = [["Select a System to view Alerts"]];
		for(k = 0; k < systems["systems"].length; k++){
			names.push([])
		}
		console.log("\n***Pushing into correct system name array***\n")
		for (i = 1; i < alerts.length+1; i++){
			for(j = 0; j < alerts[i-1]["alerts"].length; j++){
				names[i].push(alerts[i-1]["alerts"][j]["alertName"]);
			}
		}
		console.log("For loop done");
	//temp = ["Select a System to view Alerts"] + temp;
	console.log(names);
	res.send(names);
	});
});
});
module.exports = router;