var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var User = require('./models/User');
var trigRouter = require('./routes/trigAlerts');
var idleRouter = require('./routes/idleAlerts');
var systemsRouter = require('./routes/systems');
var newAlertRouter = require('./routes/newAlert');
var allAlertRouter = require('./routes/allAlerts');
var deleteAlertRouter = require('./routes/deleteAlert');
var app = express();
var statusRouter = require('./routes/status');

//mongoose
mongoose.connect('mongodb://brandonnlam:password@ds241737.mlab.com:41737/blamdatabase');

//Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

var db = mongoose.connection;

//connection error
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected to mongo!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/trigAlerts', trigRouter);
app.use('/idleAlerts', idleRouter);
app.use('/systems', systemsRouter);
app.use('/newAlert', newAlertRouter);
app.use('/deleteAlert', deleteAlertRouter);
app.use('/allAlerts', allAlertRouter);
app.use('/status', statusRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
