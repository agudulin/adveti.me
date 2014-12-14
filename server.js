var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var swig = require('swig');
var passport = require('passport');

var env = process.env.NODE_ENV || 'dev';
var app = express();

if ('dev' == env) {
  app.use(logger('dev'));
  // Disable Swig's cache, in memory in prod by default
  swig.setDefaults({ cache: false });
}
// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', 'prod' == env);

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(session({
  secret: 'mathematical',
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;

require('./app/controllers/router')(app, passport);

if (!module.parent) {
  // connect to database
  var mongoose = require('mongoose');
  var DB_USER       = process.env.DB_USER,
      DB_HOST       = process.env.DB_HOST,
      DB_PORT       = process.env.DB_PORT,
      DB_PASSWORD   = process.env.DB_PASSWORD,
      DB_COLLECTION = process.env.DB_COLLECTION;
  mongoose.connect(util.format('mongodb://%s:%s@%s:%s/%s', DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_COLLECTION));

  app.listen(port);
  console.log('>> wtf has started at ' + port);
}

module.exports = app;
