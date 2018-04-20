var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
	//req.body stands for the body of the request, in this case body contain multiple parameters.
	var newAlert = req.body 
	
	//printing content of req.body to console
	console.log("\n\nContent of req.body for New Alert from React to Express:\n\n" +
	newAlert.firstParam + "\n" + 
	newAlert.secondParam + "\n" +
	newAlert.thirdParam + "\n\n");
	
	res.send('Sup?')
	// Make in an alert object? and send to Mongoose
});//end of POST

module.exports = router;