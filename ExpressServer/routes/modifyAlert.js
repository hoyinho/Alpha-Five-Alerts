var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');
/* 					username: this.state.login, 
					oldName: this.state.modAlertName,
					newName: this.state.newModAlertName,
					newThreshold: this.state.newThreshold,
					newField: this.state.newField,
					sysName: this.state.systems[this.state.sysSelect] */
router.post('/', function(req, res, next){
	var newValues = req.body;
	var alerts = db.get_Alert(newValues.username, newValues.oldName, newValues.sysName).then(function(currAlert){
		if(!newValues.newName){ newValues.newName = currAlert["alerts"][0]["alertName"] }
		if(!newValues.newThreshold){ newValues.newThreshold = currAlert["alerts"][0]["alertThreshold"]}
		if(!newValues.newField){ newValues.newField = currAlert["alerts"][0]["alertField"]}
		db.delete_Alert( newValues.username, currAlert["alerts"][0]["alertName"], currAlert["alerts"][0]["systemName"]).then(function(confirmation){});
		db.create_Alert(newValues.username, newValues.newName, newValues.newThreshold, newValues.newField, newValues.sysName).then(function(confirmation){});
	});// end of get_One_Alerts
	
	
	
	//Commented is two ways we can attend modifying an alert. The first way is:
		//db.change_Alert(newValues.username, newValues.name, newValues).then(function(confirmation){console.log(confirmation);});
		
	//The second approach is:
		//const oldValues = old alert based on name
		//var newAlert; Will be propagated with values during if statements 
	
		//Delete the old copy of the alert from the database
		//db.delete_Alert( oldValues.username, oldValues.name ).then(function(confirmation){console.log(confirmation)});
	
		// Make an alert object based on newAlert.(name-field) while using oldValues to specify its sysName and username
		//db.create_Alert(oldValues.username, newAlert.name, newAlert.threshold, newAlert.field, oldValues.sysName)
		//	.then(function(confirmation){console.log(confirmation);});
	
});//end of POST

module.exports = router;
