var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var systemNames = db.get_All_Systems_Names("Hoyin");
    systemNames.then(function(systems){
		/* console.log(systems[0]["systems"]["companyName"]);
		console.log(systems); */
	var names = {};
	names = ["Select a System"];
	//console.log(systems + "stuff");
	for (i = 0; i < systems.length; i++){
	    names.push(systems[i]["systems"]["companyName"]);
	}
	//console.log(names);
	res.send(names);
    });
});

module.exports = router;