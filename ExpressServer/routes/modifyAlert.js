var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next){
	var newValues = req.body;
	var systems = db.get_All_Systems(newValues.username).then(function(system){
		var alerts = db.get_All_Alerts(newValues.username).then(function(currAlert){
			var sysInt;
			for(i = 0; i < currAlert.length; i++){
				if(currAlert[i]["_id"]===newValues.sysName){
					sysInt = i;
				}
			}
			var alertInt;
			for(i = 0; i < currAlert[sysInt]["alerts"].length; i++){
				if(currAlert[sysInt]["alerts"][i]["alertName"]===newValues.oldName){
					alertInt = i;
				}
			}
		
		if(!newValues.newName){ newValues.newName = currAlert[sysInt]["alerts"][alertInt]["alertName"] }
		if(!newValues.newThreshold){ newValues.newThreshold = currAlert[sysInt]["alerts"][alertInt]["alertThreshold"]}
		if(!newValues.newField){ newValues.newField = currAlert[sysInt]["alerts"][alertInt]["alertField"]}
		console.log(newValues);
		db.delete_Alert( newValues.username, currAlert[sysInt]["alerts"][alertInt]["alertName"], currAlert[sysInt]["alerts"][alertInt]["systemName"]).then(function(confirmation){
			console.log(currAlert)
			db.create_Alert(newValues.username, newValues.newName, newValues.newThreshold, newValues.newField, newValues.sysName).then(function(test){});
		});
		});
	});// end of get_One_Alerts
	
});//end of POST

module.exports = router;
