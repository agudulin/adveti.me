var grabNewEpisodes = require('./grab');

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

    grabNewEpisodes(showId, season);
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
