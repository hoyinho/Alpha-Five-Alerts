var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next) {
	const login = req.body;
	var systemNames = db.get_All_Systems_Names(login.username);
	var systemAll = db.get_All_Systems("Hoyin").then(function(systems){
	});
    systemNames.then(function(systems){
	var sysNames = {};
	sysNames = ["Select a System"];
	for (i = 0; i < systems.length; i++){
	    sysNames.push(systems[i]["systems"]["companyName"]);
	}
	var alertsNames = db.get_All_Alerts("Hoyin");   
    alertsNames.then(function(alerts){
		var names = {};
		names = [["Select a System to view Alerts"]];
		for(k = 0; k < systems.length; k++){
			names.push([])
		}
		var index = 1;
		for (i = 0; i < alerts.length; i++){
			while(alerts[i]["_id"]!=sysNames[index]){
				index ++;
			}
			for(j = 0; j < alerts[i]["alerts"].length; j++){
				if(alerts[i]["alerts"][j]["alertThreshold"]%2==1){//if alertThreshold < system
					names[index].push(alerts[i]["alerts"][j]["alertName"]);
				}
			}
		}
	res.send(names);
	});
});
});
module.exports = router;