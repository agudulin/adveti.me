var async = require('async');
var cheerio = require('cheerio');
var express = require('express');
var request = require('request');
var util = require('util');

var Show = require('../models/show');
var User = require('../models/user');

module.exports = function(app, passport) {
  require('./passport')(passport);

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', function(req, res) {
    res.redirect('/auth/twitter');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Redirect the user to Twitter for authentication.  When complete, Twitter
  // will redirect the user back to the application at
  //   /auth/twitter/callback
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // Twitter will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

  // show regular user profile page
  app.get('/profile', isLoggedIn, function (req, res, next) {
    if (req.user.role === 'ADMIN') {
      return res.redirect('/admin');
    }
    res.render('profile', {
      user: req.user
    });
  });

  // show admin page
  app.get('/admin', isLoggedInAsAdmin, function(req, res) {
    res.render('admin', {
      user: req.user,
      show: {
        id: "53e552117425f53b64000003"
      }
    });
  });

  // get all users
  app.get('/api/users', isLoggedInAsAdmin, function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

  // get all show information by id
  app.get('/api/show/:show_id', function(req, res) {
    Show.findById(req.params.show_id, function(err, show) {
      if (err) {
        res.send(err);
      }
      res.json(show);
    });
  });

  // get all episodes from the season
  app.get('/api/show/:show_id/:season/episodes', function(req, res) {
    Show.findById(req.params.show_id, function(err, show) {
      if (err) {
        res.send(err);
      }
      var filteredEpisodes = show.episodes.filter(function(episode){
        return episode.season == req.params.season;
      });
      res.json(filteredEpisodes);
    });
  });

  // add new episodes or update existent
  // required params:
  //  * show id
  //  * season number
  app.post('/api/grab', isLoggedInAsAdmin, function(req, res, next) {
    var season = parseInt(req.body.season, 10);
    var showId = req.body.show_id;
    var episodes = [];

    async.waterfall([
      function(callback) {
        request(util.format('http://advetime.ru/category/sezon-%s', season), function(error, response, body) {
          if (error) {
            return next(error);
          }
          $ = cheerio.load(body);
          var links = $('.type_category .cell-content .wrap h4 a');
          $(links).each(function(i, link) {
            var episode = {
              season: season,
              name: $(link).text(),
              url: $(link).attr('href')
            };
            episodes.push(episode);
            console.log(util.format('%s : %s', episode.name, episode.url));
          });
          callback(error, episodes);
        });
      },
      function(episodes, callback) {

        function getEpisode(episode, callback) {
          request.get(episode.url, function(error, response, body) {
            if (error) { callback(error); }
            $ = cheerio.load(body);
            var tabsContainer = $('.type_page_content .tabs_widget');
            var voiceNames = tabsContainer.find('.elem span');
            var voiceNamesArray = [];
            $(voiceNames).each(function(i, voiceName) {
              voiceNamesArray.push($(voiceName).text());
            });

            var iframes = tabsContainer.find('iframe');
            episode.videos = [];
            $(iframes).each(function(i, iframe) {
              episode.videos.push({
                name: voiceNamesArray[i],
                url: $(iframe).attr('src')
              });
            });
            console.log(episode);
            callback();
          });
        }

        async.each(episodes, getEpisode, function(err) {
          if (err) return next(err);
          callback(err, episodes);
        });
      },
      function(episodes, callback) {
        Show.findById(showId, function(err, show) {
          if (err) {
            res.send(err);
          }
          // find episodes from the season we want update in our db
          // remove all old episodes and add new
          var filteredEpisodes = show.episodes.filter(function(episode){
            return episode.season === season;
          });
          filteredEpisodes.forEach(function(episode, idx) {
            show.episodes.id(episode._id).remove();
          });

          show.episodes = show.episodes.concat(episodes);
          callback(err, show);
        });
      }
    ], function(err, show) {
      if (err) return next(err);
      console.log("DONE FINALLY");
      show.save(function(err) {
        if (err) {
          res.send(err);
        }
      });
      res.status(200).send({ msg: 'New episodes added!' });
    });
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
  }

  function isLoggedInAsAdmin(req, res, next) {
    if (req.isAuthenticated()) {
      User.findById(req.user.id, function(err, user) {
        if (err || user.role != 'ADMIN') {
          return res.status(403).send({
            error: true,
            msg: 'Permission denied'
          });
        }
      });
      return next();
    }

    res.status(403).send({
      error: true,
      msg: 'Permission denied'
    });
  }
};
