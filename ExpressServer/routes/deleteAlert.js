var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.post('/', function(req, res, next){
	const alert = req.body 
	// Tell mongo what to delete
	db.deleteAlert( alert.name );
	
});//end of POST

module.exports = router;