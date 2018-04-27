var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next){
	//req.body stands for the body of the POST request
	const login = req.body 
	
	//printing content of alert to console
	
	// Make  an alert object, and send to Mongoose
	db.validate_Login(login.username,login.password).then(function(confirmation){
	var loggedIn = false;
	for(i = 0; i < confirmation.length; i++){
		if(confirmation[i]["username"]==login.username){
			console.log("Successful login\nUsername: "+login.username+"\nPassword: "+login.password);
			res.json(confirmation[i]);
			loggedIn = true;
		}
	}
	if(!loggedIn){
		console.log("Failed login\nUsername: "+login.username+"\nPassword: "+login.password);
		res.json(confirmation[0]);
	}
	});
	
});//end of POST

module.exports = router;
