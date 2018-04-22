var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("12345678");
    var systemNames = db.get_All_Systems_Names("Hoyin");
    systemNames.then(function(systems){
	var names = {};
	names = ["Select a System"];
	console.log(systems + "stuff");
	for (i = 0; i < systems["systems"].length; i++){
	    names.push(systems["systems"][i]["companyName"]);
	}
	console.log(names);
	res.send(names);
    });
    {/*var temp = {} 
	temp = ["Select a System", 
	"Zach's System", 
	"Elise's System", 
	"John's System", 
	"Neena's System"]
	console.log(temp[1]);
	res.send(temp); */}

});

module.exports = router;
