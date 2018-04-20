var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next){
	//req.body stands for the body of the POST request
	const alert = req.body 
	
	//printing content of alert to console
	console.log("\n\nContent of req.body for New Alert from React to Express:\n\n" +
	alert.username + "\n" + 
	alert.name + "\n" +
	alert.threshold + "\n" +
	alert.field + "\n\n");
	
	// Make  an alert object, and send to Mongoose
    db.create_Alert(alert.username, alert.name, alert.threshold, alert.field, alert.serial).then(function(confirmation){
	console.log(confirmation);
    });
	
});//end of POST

module.exports = router;
