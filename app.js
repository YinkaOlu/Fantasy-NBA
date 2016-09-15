var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');
var playerStat = require('./routes/playerStatServer');
var choicePageRoute = require('./routes/choicePageServer');
var calculateRoute = require('./routes/calculateRoute');

//Add MongoDB
var mongo = require('mongodb');

var mongoose = require('mongoose');
mongoose.connect('mongodb://yinkaolu:Olu101!!@ds037395.mongolab.com:37395/nba', function(){
  console.log('connected to database!')
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

app.use('/playerStat', playerStat);
app.use('/choicePage', choicePageRoute);
app.use('/api', api);
app.use('/calculate', calculateRoute);


module.exports = app;
