var mongoose = require("mongoose");
var fs = require("fs");
var hpeJson = JSON.parse(fs.readFileSync('umass-export-pretty-print.json', 'utf8'));

mongoose.connect('mongodb://localhost/test2');

var db = mongoose.connection;
var User = require("./user");
var System = require("./dbQuery");

// connection error
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('we are connected!'); 
	for(i = 0; i < hpeJson.length; i++){
		console.log("\n *System Info #" + (i+1));
		console.log(hpeJson[i]["serialNumberInserv"]);
		console.log(hpeJson[i]["system"]["companyName"]);
		console.log(hpeJson[i]["system"]["model"]);
		console.log(hpeJson[i]["system"]["fullModel"]);
		console.log(hpeJson[i]["system"]["osVersion"]);
		console.log(hpeJson[i]["updated"]);
		console.log(hpeJson[i]["capacity"]["total"]["sizeTiB"]);
		console.log(hpeJson[i]["capacity"]["total"]["freeTiB"]);
		console.log(hpeJson[i]["capacity"]["total"]["freePct"]);
		console.log(hpeJson[i]["capacity"]["total"]["freePctZeroPredictedDate"]);
		console.log(hpeJson[i]["capacity"]["total"]["failedCapacityTiB"]);
		console.log(hpeJson[i]["nodes"]["cpuAvgMax"]); //+
		console.log(hpeJson[i]["performance"]["portBandwidthData"]["total"]["dataRateKBPSAvg"]);

/* 		System.create_System( //UNCOMMENT THIS BLOCK TO ADD SYSTEMS TO "Hoyin"
			"Hoyin",
			hpeJson[i]["serialNumberInserv"],
			hpeJson[i]["system"]["companyName"],
			hpeJson[i]["system"]["model"],
			hpeJson[i]["system"]["fullModel"],
			hpeJson[i]["system"]["osVersion"],
			hpeJson[i]["updated"],
			hpeJson[i]["capacity"]["total"]["sizeTiB"],
			hpeJson[i]["capacity"]["total"]["freeTiB"],
			hpeJson[i]["capacity"]["total"]["freePct"],
			hpeJson[i]["capacity"]["total"]["freePctZeroPredictedDate"],
			hpeJson[i]["capacity"]["total"]["failedCapacityTiB"],
			hpeJson[i]["nodes"]["cpuAvgMax"],
			hpeJson[i]["performance"]["portBandwidthData"]["total"]["dataRateKBPSAvg"]
			).then(function(stuff){
			console.log(stuff);
		}); //end of System.create_System() 
*/
	}//end of for loop
});//end of db.once()