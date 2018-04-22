var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next){
	const alert = req.body;
	console.log("Delete: \nUsername: " + alert.username + "\n");
	console.log("Name: " + alert.name + "\n");
	// Tell mongo what to delete
	db.delete_Alert( alert.username, alert.name ).then(function(confirmation){
	console.log(confirmation)});
	
});//end of POST

module.exports = router;