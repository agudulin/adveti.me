var _seasonEpisodes = {};
var _changeListeners = [];
var _initCalled = false;

var ShowStore = module.exports = {
  init: function () {
    if (_initCalled) {
      return;
    }
    _initCalled = true;

    getJSON("/api/show/53e552117425f53b64000003/" /*+ season + "/episodes"*/, function (err, res) {
      res.episodes.forEach(function (episode) {
        if (_seasonEpisodes[episode.season] === undefined) {
          _seasonEpisodes[episode.season] = [];
        }
        _seasonEpisodes[episode.season].push(episode);
      });

      ShowStore.notifyChange();
    });
  },

  getEpisodes: function() {
    return _seasonEpisodes;
  },

  getSeasonEpisodes: function (season) {
    return _seasonEpisodes[season];
  },

  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },

  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },

  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  }
};

function getJSON(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status === 404) {
      cb(new Error('not found'));
    } else {
      cb(null, JSON.parse(req.response));
    }
  };
  req.open('GET', url);
  req.send();
}
