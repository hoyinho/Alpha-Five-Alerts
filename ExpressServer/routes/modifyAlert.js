var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next){
	var newValues = req.body;
	var alerts = db.get_Alert(newValues.username, newValues.oldName, newValues.sysName).then(function(currAlert){
		if(!newValues.newName){ newValues.newName = currAlert["alerts"][0]["alertName"] }
		if(!newValues.newThreshold){ newValues.newThreshold = currAlert["alerts"][0]["alertThreshold"]}
		if(!newValues.newField){ newValues.newField = currAlert["alerts"][0]["alertField"]}
		db.delete_Alert( newValues.username, currAlert["alerts"][0]["alertName"], currAlert["alerts"][0]["systemName"]).then(function(confirmation){});
		db.create_Alert(newValues.username, newValues.newName, newValues.newThreshold, newValues.newField, newValues.sysName).then(function(confirmation){});
	});// end of get_One_Alerts
	
});//end of POST

module.exports = router;
