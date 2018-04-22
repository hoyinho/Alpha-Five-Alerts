var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.get('/', function(req, res, next) {
	var alertsNames = db.get_All_Alerts("Hoyin");   
    alertsNames.then(function(alerts){
		console.log("All Alerts start");
		console.log(alerts);
		var names = {};
		names = ["------"];
		for (i = 0; i < alerts["alerts"].length; i++){
			console.log("For loop");
			names.push(alerts["alerts"][i]["alertName"]);
			console.log("Names length" + names.length +"\n");
		}
		console.log("For loop done");
	console.log(names);
	res.send(names);
	})
});

module.exports = router;