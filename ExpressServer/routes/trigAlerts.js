var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var temp = {} 
	temp = [["Select a System to view Alerts"],["Full Storage"],[],[],["Slow RAM", "Need Patch"]];
	console.log(temp[1]);
  res.send(temp);
});

module.exports = router;