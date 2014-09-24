var async = require('async');
var cheerio = require('cheerio');
var express = require('express');
var request = require('request');
var util = require('util');

var Show = require('./app/models/show');
var routesConfig = require('./conf/routes.json');

var router = express.Router();

router.route('/api/show/:show_id')
  // get all show information by id
  .get(function(req, res) {
    Show.findById(req.params.show_id, function(err, show) {
      if (err) {
        res.send(err);
      }
      res.json(show);
    });
  });

router.route('/api/show/:show_id/:season/episodes')
  // get all episodes from the season
  .get(function(req, res) {
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

router.route('/api/grab')
  // add new episodes or update existent
  // required params:
  //  * show id
  //  * season number
  .post(function(req, res, next) {
    var secretKey = req.body.secret_key;
    if (secretKey !== routesConfig.grab.secret_key) {
      return res.status(403).send({
          error: true,
          msg: 'Permission denied'
      });
    }

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

module.exports = router;
