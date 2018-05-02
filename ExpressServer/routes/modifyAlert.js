var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next){
	var newValues = req.body; /*Note to UI Developers
													req.body needs: 
													{username,
													current alert system???,
													Current name of alert,
													new name of alert,
													new threshold value,
													new field}
												It would also make the route 100 times
												easier/cleaner to write if you also return:
													{current threshold value,
													current field}
												If you send those two values along too then
												we don't need to loop to look them up.
												*/
					
	//var alerts = db.get_All_Alerts(login.username).then(function(currAlerts){});
	
	//if(!newValues.alertName){ /*newValues.alertName = currAlert[][][] */}else{}
	//if(!newValues.alertThreshold){	/*newValues.alertThreshold = currAlert[][][] */}else{}
	//if(!newValues.alertField){	/*newValues.alertField =currAlert[][][] */}else{}
	
	db.change_Alert(newValues.username, newValues.name, newValues).then(function(confirmation){console.log(confirmation);});
	
	});// end of get_All_Alerts
	
	
	
	//Commented is two ways we can attend modifying an alert. The first way is:
		//db.change_Alert(newValues.username, newValues.name, newValues).then(function(confirmation){console.log(confirmation);});
		
	//The second approach is:
		//const oldValues = old alert based on name
		//var newAlert; Will be propagated with values during if statements 
	
		//All if's store the desired value into newAlert, if's check for empty values in newValues
		//if (newValues.name is empty) then use oldValues.name, else use newValues.name
		//if (newValues.threshold is empty) then use oldValues.threshold, else use newValues.threshold
		//if (newValues.field is empty) then use oldValues.field, else use newValues.field
	
		//Delete the old copy of the alert from the database
		//db.delete_Alert( oldValues.username, oldValues.name ).then(function(confirmation){console.log(confirmation)});
	
		// Make an alert object based on newAlert.(name-field) while using oldValues to specify its sysName and username
		//db.create_Alert(oldValues.username, newAlert.name, newAlert.threshold, newAlert.field, oldValues.sysName)
		//	.then(function(confirmation){console.log(confirmation);});
	
});//end of POST

module.exports = router;
