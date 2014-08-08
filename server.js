var express = require('express');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var util = require('util');
var async = require('async');

var app = express();

app.use(bodyParser());

var port = process.env.PORT || 8080;

var mongoose   = require('mongoose');
// connect to database
mongoose.connect('mongodb://atuser:atpass@ds053109.mongolab.com:53109/advetime');
var Show = require('./app/models/show');

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log(req.method + " " + req.url);
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' }); 
});

router.route('/show')
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
      if (err)
        res.send(err);

      res.json(show);
    });
  });

// ----------------------------------------------------
router.route('/show/:show_id')
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

router.route('/show/:show_id/episodes')
  .post(function(req, res) {
    Show.findById(req.params.show_id, function(err, show) {
      if (err) {
        res.send(err);
      }

      show.episodes = JSON.parse("" + req.body.episodes);

      show.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'New episodes added!' });
      });
    });
  })
  .get(function(req, res) {
    Show.findById(req.params.show_id, function(err, show) {
      if (err) {
        res.send(err);
      }
      res.json(show.episodes);
    });
  });

//
//
//
router.route('/grab')
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
            episode = {
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
            tabsContainer = $('.type_page_content .tabs_widget');
            voiceNames = tabsContainer.find('.elem span');
            voiceNamesArray = [];
            $(voiceNames).each(function(i, voiceName) {
              voiceNamesArray.push($(voiceName).text());
            });

            iframes = tabsContainer.find('iframe');
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
app.use('/api', router);

app.listen(port);
console.log('>> wtf has started at ' + port);
