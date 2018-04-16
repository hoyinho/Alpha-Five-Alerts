var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var temp = {} 
	temp = ["Select a System", 
	"TEST's System", 
	"E's System", 
	"J's System", 
	"N's System"]
	console.log(temp[1]);
  res.send(temp);
});

module.exports = router;
