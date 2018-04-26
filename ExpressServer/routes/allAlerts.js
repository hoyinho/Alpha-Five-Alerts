var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next) {
	const login = req.body;
	var systemNames = db.get_All_Systems_Names(login.username);
	var sysNames = {};
    systemNames.then(function(systems){
		sysNames = ["Select a System"];
		for (i = 0; i < systems.length; i++){
			sysNames.push(systems[i]["systems"]["companyName"]);
		}
		//console.log(sysNames);
	var alertsNames = db.get_All_Alerts("Hoyin");   
    alertsNames.then(function(alerts){
    	//console.log(alerts);
    	//console.log(alerts[0]);
		var names = {};
		names = [];
		for(k = 0; k < sysNames.length; k++){
			names.push(["------"]);
		}
		//console.log(names);
		var index = 1;
		for (i = 0; i < alerts.length; i++){
			while(alerts[i]["_id"]!=sysNames[index]){
				//console.log(alerts[i]["_id"] + " is not the same as " + sysNames[index])
				index ++;
			}
			//console.log(alerts[i]["_id"] + "is the same as " + sysNames[index]);
			for(j = 0; j < alerts[i]["alerts"].length; j++){
				names[index].push(alerts[i]["alerts"][j]["alertName"]);
				//console.log("******************" + alerts[i]["alerts"][j]["alertName"]);
			}
		}
	//console.log("names\n***************\n")
	//console.log(names);
	res.send(names);
	})});
});

module.exports = router;