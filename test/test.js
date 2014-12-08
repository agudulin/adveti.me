var path = require('path');
var http = require('http');
var request = require('supertest');
var should = require('should');
var express = require('express');

var app = require(path.join(__dirname, '..', 'server'));
var port = 3333;

describe('app', function() {
  before(function(done) {
    app.listen(port, function(err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  it('should exist', function(done) {
    should.exist(app);
    done();
  });

  it('should be listening at localhost:3333', function(done) {
    request(app)
      .get('/')
      .set('port', port)
      .set('Accept', 'application/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

});
