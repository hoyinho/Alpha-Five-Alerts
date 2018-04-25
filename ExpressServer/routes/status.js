var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');
/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("\n\n\n***************\n\n Get All Systems\n\n\n\n***************\n\n");
	var systemNames = db.get_All_Systems_Names("Hoyin");
    systemNames.then(function(systems){
		var sysNames = {};
		sysNames = ["Select a System"];
		for (i = 0; i < systems.length; i++){
			sysNames.push(systems[i]["systems"]["companyName"]);
		}
		//console.log(sysNames);
		var statusNames = db.get_All_Systems("Hoyin");   
		statusNames.then(function(statuses){
			console.log("\n***Result of get_All_Systems***\n");
			console.log(statuses);
			console.log("\n***Result of get_all_statuses[0]***\n");
			console.log(statuses[0]);
			console.log("\n***Result of get_all_statuses[1]***\n");
			console.log(statuses[1]);
			console.log("\n***Result of get_all_statuses[2]***\n");
			console.log(statuses[2]);
			var names = {};
			names = [["Select a System to view statuses"]];
			for(k = 0; k < systems.length; k++){
				names.push([])
			}
			for(i = 1; i <statuses.length+1; i++){
				names[i].push("Capacity In Terabytes:        					    "+statuses[i-1]["systems"]["capacity"]["sizeTiB"]);
				names[i].push("Free Terabytes:                  					    "+statuses[i-1]["systems"]["capacity"]["freeTiB"]);
				names[i].push("Free Storage Percentage:     					    "+statuses[i-1]["systems"]["capacity"]["freePct"]);
				names[i].push("Predicted Full Storage Date: 					    "+statuses[i-1]["systems"]["capacity"]["freePctZeroPredictedDate"]);
				names[i].push("Filled Capacity In Terabytes:					    "+statuses[i-1]["systems"]["capacity"]["failedCapacityTiB"]);
				names[i].push("Average CPU Performance:                         "+statuses[i-1]["systems"]["nodes"]["cpuAvgMax"]);
				names[i].push("Data Rate Average In Kilobytes per second: "+statuses[i-1]["systems"]["Performance"]["dataRateKBPSAvg:"]);
				names[i].push("System ID:                                              "+statuses[i-1]["systems"]["_id"]);
				names[i].push("Serial Number In Service:                           "+statuses[i-1]["systems"]["serialNumberInserv"]);
				names[i].push("Company Name:                                       "+statuses[i-1]["systems"]["companyName"]);
				names[i].push("Model:                                                    "+statuses[i-1]["systems"]["model"]);
				names[i].push("Full Model:                                              "+statuses[i-1]["systems"]["fullModel"]);
				names[i].push("Operating System Version:                        "+statuses[i-1]["systems"]["osVersion"]);
				names[i].push("Updated:                                                "+statuses[i-1]["systems"]["updated"]);
				
			}
			//console.log("\n***Pushing into correct system name array***\n")
			
				//console.log("For loop done");
			//temp = ["Select a System to view statuses"] + temp;
			//console.log(names);
			res.send(names);
		});
	});
});

module.exports = router;
