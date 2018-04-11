// external modules
var mongoose = require("mongoose");

// custom module (our mongoose model)
var User = require('./User');
var Alert = require('./Alert');
var System = require('./System');

// test is the name of the database we want to connect to
// this can be anything you want
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

// connection error
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected!');

  // let's create a user
  User.create({
    username: 'Matt',
    password: sidh9,
  }).then(function(savedUser) {
    console.log("We saved this user!", savedUser);
  }).catch(function(error) {
    console.error(error);
  })

  // find all 21 year old users
/*  User.find({age: 21})
    .then(function(users) {
      console.log(users)
    })
    .catch(function(error) {
      console.error(error);
    })
*/
  /* OTHER MONGOOSE FUNCTIONS I TEND TO USE
  .remove()
  .findById() mongoose assigns unique ids to each elem
  .findOneAndUpdate() search and update at same time
  */

});