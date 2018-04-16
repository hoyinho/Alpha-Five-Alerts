var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([
	{names: "Select a System"}, 
	{names: "Z's System"}, 
	{names: "E's System"}, 
	{names: "J's System"}, 
	{names: "N's System"}
  ]);
});

module.exports = router;
