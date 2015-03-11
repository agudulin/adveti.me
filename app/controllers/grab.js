var async = require('async');
var cheerio = require('cheerio');
var express = require('express');
var request = require('request');
var util = require('util');
var fecha = require('fecha');

var Show = require('../models/show');
var User = require('../models/user');

var ADVETIME_SEASON_PAGE = 'http://advetime.ru/category/sezon-%s';
var ADVETIME_SEASON_LINK = '.type_category .cell-content .wrap h4 a';
var ADVETIME_EPISODE_TABS_CONTAINER = '.type_page_content .tabs_widget';
var ADVETIME_EPISODE_VOICES = '.elem span';

var parseSeasonPageForEpisodeInfo = function(showId, season, episodes, callback) {
  return request(util.format(ADVETIME_SEASON_PAGE, season), function(error, response, body) {
    if (error) {
      callback(error);
      return;
    }
    var $ = cheerio.load(body);
    var links = $(ADVETIME_SEASON_LINK);
    $(links).each(function(i, link) {
      var episode = {
        season: season,
        name: $(link).text(),
        url: $(link).attr('href')
      };
      episodes.push(episode);
      console.log(util.format('%s : %s', episode.name, episode.url));
    });

    callback(null, episodes);
  });
};

var parseEpisodePage = function(episode, callback) {
  request.get(episode.url, function(error, response, body) {
    if (error) {
      return callback(error);
    }
    var $ = cheerio.load(body);
    var tabsContainer = $(ADVETIME_EPISODE_TABS_CONTAINER);
    var voiceNames = tabsContainer.find(ADVETIME_EPISODE_VOICES);
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
};

module.exports = function(showId, season, onParseCompleteCallback) {
  var episodes = [];

  async.waterfall([
    function(callback) {
      parseSeasonPageForEpisodeInfo(showId, season, episodes, callback);
    },
    function(episodes, callback) {
      async.each(episodes, parseEpisodePage, function(err) {
        if (err) {
          return callback(err);
        }
        callback(null, episodes);
      });
    },
    function(episodes, callback) {
      Show.findById(showId, function(err, show) {
        if (err) {
          return callback(err);
        }
        // find episodes from the season we want update in our db
        // remove all old episodes and add new
        var filteredEpisodes = show.episodes.filter(function(episode) {
          return episode.season === season;
        });
        filteredEpisodes.forEach(function(episode) {
          show.episodes.id(episode._id).remove();
        });

        show.episodes = show.episodes.concat(episodes);
        show.updated = fecha.format(new Date(), 'MMM Do, YYYY');
        callback(null, show);
      });
    },
    function(show, callback) {
      show.save(function(err) {
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    }
  ], function(err, result) {
    onParseCompleteCallback(err);
  });
};
