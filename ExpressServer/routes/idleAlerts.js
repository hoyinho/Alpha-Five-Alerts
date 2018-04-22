var express = require('express');
var router = express.Router();
var db = require('./../../database/dbQuery');

router.get('/', function(req, res, next) {
	var temp = db.get_All_Alerts("Hoyin");
	//temp = ["Select a System to view Alerts"] + temp;
	console.log(temp[0]);
  res.send(temp);
});

module.exports = router;