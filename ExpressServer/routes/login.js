var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next){
	//req.body stands for the body of the POST request
	const login = req.body 
	
	//printing content of alert to console
	console.log("\n\nContent of req.body for New Alert from React to Express:\n\n" +
	login.username + "\n" +
	login.password + "\n");
	
	// Make  an alert object, and send to Mongoose
	db.validate_Login(login.username,login.password).then(function(confirmation){ 
	if(confirmation.length()==0){
		console.log("bad stuff");
		res.json("");
	}
	else{
		console.log("good stuff")
		res.json(login.username);
	}
	});
	
});//end of POST

module.exports = router;
