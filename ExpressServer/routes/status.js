var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var temp = {} 
	temp = [false,false, true, true, false]
	//console.log(temp[1]);
  res.send(temp);
});

module.exports = router;
