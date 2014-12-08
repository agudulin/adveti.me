var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var swig = require('swig');
var passport = require('passport');

var app = express();

app.use(bodyParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'app', 'views'));

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });

app.use(session({
  secret: 'mathematical',
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;

// connect to database
var mongoose = require('mongoose');
var db = require('./app/conf/db.json');
mongoose.connect(util.format('mongodb://%s:%s@%s:%s/%s', db.user, db.password, db.host, db.port, db.collection));

require('./app/controllers/router')(app, passport);

app.listen(port);
console.log('>> wtf has started at ' + port);
