var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

/* function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
} */

router.post('/', function(req, res, next) {
	var login = req.body;
	console.log("*****************************Idle Alerts start*****************************");
	var systems = db.get_All_Systems(login.username).then(function(system){
		var alerts = db.get_All_Alerts(login.username).then(function(alert){
		
		//filter out needed "field: values" for comparing agaisnt alerts. companyName=systemName
		var sysFilt = system.map(function(x){ 
			return [ x["systems"]["companyName"], x["systems"]["capacity"], x["systems"]["nodes"], x["systems"]["Performance"] ]; 
		})
		sysFilt.map(function(s2){
/* 				console.log(s2[1]);
				console.log("\n"); */
		});
		
		//filter the alert: objects into filtedAlerts
		var filteredAlerts = alert.map(function(a){ return a["alerts"]; });
		
		//compare alerts agaisnt system
		var response = {};
		response = [["Select a System to view Alerts"]];
		for(k = 0; k < system.length; k++){
			response.push([]);
		}
		//console.log(system.length);
		for(i = 0; i < system.length; i++){//filteredSystems.map(function(s){
			filteredAlerts.map(function(a){
				//console.log(a);
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
								//console.log("\nALERT!!!!!\n")
								response[i+1].push(a2["alertName"] + ": " + sysFilt[i][1][a2["alertField"]] + " hasn't passed " + a2["alertThreshold"]);
							}
						}
						//if the alertfield exists here, then...
						else if(sysFilt[i][2][a2["alertField"]]){
							//if status >= threshold, then sound the alarm
							if(sysFilt[i][2][a2["alertField"]] < a2["alertThreshold"]){
								//console.log("\nALERT!!!!!\n")
								response[i+1].push(a2["alertName"] + ": " + sysFilt[i][2][a2["alertField"]] + " hasn't passed " + a2["alertThreshold"]);
							}
						}
						//if the alertfield exists here, then...
						else if(sysFilt[i][3][a2["alertField"]]){
							//if status >= threshold, then sound the alarm
							if(sysFilt[i][3][a2["alertField"]] > a2["alertThreshold"]){
								//console.log("\nALERT!!!!!\n")
								response[i+1].push(a2["alertName"] + ": " + sysFilt[i][3][a2["alertField"]] + " hasn't passed " + a2["alertThreshold"]);
							}
						}//end of if(s[1/2/3][a2["alertField"]])
					}//end of if(s[0] === a2["systemName"])
				});//end of 'a2' map
			});//end of 'a' map
		}//);//end of 's' map	
		
/* 		var testy = response.map(function(x){
			x.filter(function(x2){
			});
			for(i=0; i < x.length; i++){ x[i] = filter_array(x[i]); }
			return x;
			//console.log();
			
		}); */
		//console.log(response);
		
		
		res.send(response);
		});	
	});
});//end of router.get()
module.exports = router;