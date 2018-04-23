var mongoose = require("mongoose");


// test is the name of the database we want to connect to
// this can be anything you want
mongoose.connect('mongodb://localhost/test2');

var db = mongoose.connection;
var User = require("./user");
var System = require("./dbQuery");


// connection error
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('we are connected!');
});