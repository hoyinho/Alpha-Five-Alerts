var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var temp = {} 
	temp = [["Select a System to view Alerts"],["Slow RAM", "Need Patch"],["Full Storage", "Slow RAM", "Need Patch"],["Full Storage", "Slow RAM", "Need Patch"],["Full Storage"]];
	console.log(temp[1]);
  res.send(temp);
});

module.exports = router;