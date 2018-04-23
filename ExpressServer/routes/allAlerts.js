var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.get('/', function(req, res, next) {
	var alertsNames = db.get_All_Alerts("Hoyin");   
    alertsNames.then(function(alerts){
    	console.log(alerts);
    	console.log(alerts[0]);
		var names = {};
		names = ["------"];
		for (i = 0; i < alerts.length; i++){
			for(j = 0; j < alerts[i]["alerts"].length; j++){
				names.push(alerts[i]["alerts"][j]["alertName"]);
				console.log("******************" + alerts[i]["alerts"][j]["alertName"]);
			}
		}
	console.log(names);
	res.send(names);
	})
});

module.exports = router;