var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.get('/', function(req, res, next) {
	var Usernames = db.get_All_Usernames();   
    Usernames.then(function(getnames){
		var names = {};
		for (i = 0; i < getnames['usernames'].length; i++){
			names.push(getnames['usernames'][i]["alertName"]);
		}
		console.log("For loop done");
	console.log(names);
	res.send(names);
	})
});

module.exports = router;