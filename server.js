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

var Show = require('./app/models/show');

var router = express.Router();

router.get('/api', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' }); 
});

router.route('/api/show')
  .post(function(req, res) {
    var show = new Show();
    console.log(req.body);
    show.name = req.body.name;
    show.episodes = JSON.parse("" + req.body.episodes);

    show.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Show created!' });
    });
  })
  .get(function(req, res) {
    Show.find(function(err, show) {
      if (err) {
        res.send(err);
      }

      res.json(show);
    });
  });

// ----------------------------------------------------
router.route('/api/show/:show_id')
  .get(function(req, res) {
    Show.findById(req.params.show_id, function(err, show) {
      if (err) {
        res.send(err);
      }
      res.json(show);
    });
  })
  .put(function(req, res) {
    Show.findById(req.params.show_id, function(err, show) {
      if (err) {
        res.send(err);
      }
      if (req.body.name) {
        show.name = req.body.name;  
      }
      if (req.body.episodes) {
        show.episodes = req.body.episodes;
      }      
      show.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Show updated!' });
      });
    });
  })
  .delete(function(req, res) {
    Show.remove({
      _id: req.params.show_id
    }, function(err, show) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted' });
    });
  });

// -------------------------------------------------

router.route('/api/show/:show_id/:season/episodes')
  .get(function(req, res) {
    console.log(req.params);
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

//
//
//
router.route('/api/grab')
  .post(function(req, res, next) {
    var season = parseInt(req.body.season, 10);
    var showId = req.body.show_id;
    var episodes = [];
    
    async.waterfall([
      function(callback) {
        request(util.format('http://advetime.ru/category/sezon-%s', season), function(error, response, body) {
          if (error) return next(error);
          $ = cheerio.load(body);
          var links = $('.type_category .cell-content .wrap h4 a');
          $(links).each(function(i, link) {
            var episode = {
              season: season,
              name: $(link).text(),
              url: $(link).attr('href')
            }
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
              })
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
            return episode.season == season;
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
        res.json({ message: 'New episodes added!' });
      });
      res.send(200);
    });
  });


// REGISTER ROUTES
app.use('/', router);

app.listen(port);
console.log('>> wtf has started at ' + port);
