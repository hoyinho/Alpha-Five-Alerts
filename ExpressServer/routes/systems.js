var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var temp = {} 
	temp = ["Select a System", 
	"Zach's System", 
	"Elise's System", 
	"John's System", 
	"Neena's System"]
	console.log(temp[1]);
  res.send(temp);
});

module.exports = router;
