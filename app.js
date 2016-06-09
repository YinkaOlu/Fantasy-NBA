var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');
var playerStat = require('./routes/playerStatServer');
var choicePageRoute = require('./routes/choicePageServer');
var calculateRoute = require('./routes/calculateRoute');

var passport = require('passport');

var flash    = require('connect-flash');
var session  = require('express-session');


//Add MongoDB
var mongo = require('mongodb');
//var monk = require('monk');

var mongoose = require('mongoose');
mongoose.connect('mongodb://yinkaolu:Olu101!!@ds037395.mongolab.com:37395/nba', function(){
  console.log('connected to database!')
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'mySecretKey',
  saveUninitialized: true,
  resave: true}));



app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var LocalStrategy = require('passport-local').Strategy;

var initPassport = require('./passport/init');
initPassport(passport);




app.use('/', routes);

app.use('/playerStat', playerStat);
app.use('/choicePage', choicePageRoute);
app.use('/api', api);
app.use('/calculate', calculateRoute);



//Set port to listen to
var port = process.env.PORT || 8080;
app.listen(port);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
