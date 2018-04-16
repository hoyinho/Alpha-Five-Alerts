var mongoose = require("mongoose");

// test is the name of the database we want to connect to
// this can be anything you want
mongoose.connect('mongodb://brandonnlam:password@ds241737.mlab.com:41737/blamdatabase');

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

var db = mongoose.connection;

// connection error
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected!');

});
