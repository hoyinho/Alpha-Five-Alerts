var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next) {
	var login = req.body;
	var systems = db.get_All_Systems(login.username).then(function(system){
		var alerts = db.get_All_Alerts(login.username).then(function(alert){
		
		//filter out needed "field: values" for comparing agaisnt alerts. companyName=systemName
		var sysFilt = system.map(function(x){ 
			return [ x["systems"]["companyName"], x["systems"]["capacity"], x["systems"]["nodes"], x["systems"]["Performance"] ]; 
		})
		
		//filter the alert: objects into filtedAlerts
		var filteredAlerts = alert.map(function(a){ return a["alerts"]; });
		
		var response = {};
		response = [["Select a System to view Alerts"]];
		for(k = 0; k < system.length; k++){
			response.push([]);
		}
		//compare alerts agaisnt system
		for(i = 0; i < system.length; i++){
			filteredAlerts.map(function(a){
				a.map(function(a2){
					//if system names match, then..
					if(sysFilt[i][0] === a2["systemName"]){
						//if the alertfield exists here, then...
						if(sysFilt[i][1][a2["alertField"]]){
							//if status >= threshold, then sound the alarm
							if(a2["alertField"] === "failedCapacityTiB"){
								 if(sysFilt[i][1][a2["alertField"]] < a2["alertThreshold"]){
									response[i+1].push(a2["alertName"]);
								 }
							}
							else if(sysFilt[i][1][a2["alertField"]] > a2["alertThreshold"]){
								response[i+1].push(a2["alertName"] + ": " + a2["alertField"] + ": " + sysFilt[i][1][a2["alertField"]] + " hasn't passed " + a2["alertThreshold"]);
							}
						}
						//if the alertfield exists here, then...
						else if(sysFilt[i][2][a2["alertField"]]){
							//if status >= threshold, then sound the alarm
							if(sysFilt[i][2][a2["alertField"]] < a2["alertThreshold"]){
								response[i+1].push(a2["alertName"] + ": " + a2["alertField"] + ": " + sysFilt[i][2][a2["alertField"]] + " hasn't passed " + a2["alertThreshold"]);
							}
						}
						//if the alertfield exists here, then...
						else if(sysFilt[i][3][a2["alertField"]]){
							//if status >= threshold, then sound the alarm
							if(sysFilt[i][3][a2["alertField"]] > a2["alertThreshold"]){
								response[i+1].push(a2["alertName"] + ": " + a2["alertField"] + ": " + sysFilt[i][3][a2["alertField"]] + " hasn't passed " + a2["alertThreshold"]);
							}
						}//end of if(s[1/2/3][a2["alertField"]])
					}//end of if(s[0] === a2["systemName"])
				});//end of 'a2' map
			});//end of 'a' map
		}//);//end of 's' map	
		
		//send all idle alerts to UI
		res.send(response);
		});	
	});
});//end of router.get()
module.exports = router;