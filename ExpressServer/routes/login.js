var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next){
	//req.body stands for the body of the POST request
	const login = req.body 
	
	//printing content of alert to console
	
	// Make  an alert object, and send to Mongoose
	db.validate_Login(login.username,login.password).then(function(confirmation){ 
	var names = {};
	names = [];
	if(confirmation[0]["username"]==''){
		res.json(confirmation);
	}
	else{
		res.json(confirmation);
	}
	});
	
});//end of POST

module.exports = router;
