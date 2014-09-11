var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var util = require('util');
var async = require('async');

var app = express();

app.use(bodyParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;

// connect to database
var mongoose = require('mongoose');
var db = require('./conf/db.json');
mongoose.connect(util.format('mongodb://%s:%s@%s:%s/%s', db.user, db.password, db.host, db.port, db.collection));

// register routes
var router = require('./router');
app.use('/', router);

app.listen(port);
console.log('>> wtf has started at ' + port);
