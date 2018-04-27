var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');
/* GET users listing. */
router.post('/', function(req, res, next) {
	const login = req.body;
	var systemNames = db.get_All_Systems_Names(login.username);
    systemNames.then(function(systems){
		var sysNames = {};
		sysNames = ["Select a System"];
		for (i = 0; i < systems.length; i++){
			sysNames.push(systems[i]["systems"]["companyName"]);
		}
		var statusNames = db.get_All_Systems(login.username);   
		statusNames.then(function(statuses){
			var names = {};
			names = [[["Select a System to view statuses",""]]];
			for(k = 0; k < systems.length; k++){
				names.push([[]])
			}
			for(i = 1; i <statuses.length+1; i++){
				names[i].push(["Capacity In Terabytes:",statuses[i-1]["systems"]["capacity"]["sizeTiB"]]);
				names[i].push(["Free Terabytes:",statuses[i-1]["systems"]["capacity"]["freeTiB"]]);
				names[i].push(["Free Storage Percentage:",statuses[i-1]["systems"]["capacity"]["freePct"]]);
				names[i].push(["Predicted Full Storage Date:",statuses[i-1]["systems"]["capacity"]["freePctZeroPredictedDate"]]);
				names[i].push(["Filled Capacity In Terabytes:",statuses[i-1]["systems"]["capacity"]["failedCapacityTiB"]]);
				names[i].push(["Average CPU Performance:",statuses[i-1]["systems"]["nodes"]["cpuAvgMax"]]);
				names[i].push(["Data Rate Average In KBPS:",statuses[i-1]["systems"]["Performance"]["dataRateKBPSAvg"]]);
				names[i].push(["System ID:",statuses[i-1]["systems"]["_id"]]);
				names[i].push(["Serial Number In Service:",statuses[i-1]["systems"]["serialnumberInserv"]]);
				names[i].push(["Company Name:",statuses[i-1]["systems"]["companyName"]]);
				names[i].push(["Model:",statuses[i-1]["systems"]["model"]]);
				names[i].push(["Full Model:",statuses[i-1]["systems"]["fullModel"]]);
				names[i].push(["Operating System Version:",statuses[i-1]["systems"]["osVersion"]]);
				names[i].push(["Updated:",statuses[i-1]["systems"]["updated"]]);
			}
			res.send(names);
		});
	});
});

module.exports = router;
