import Show from "../models/Show";

const debug = require("debug")("advetime");
const SHOW_ID = "53e552117425f53b64000003";

export default {
  name: "show",

  read(req, resource, { season }, config, done) {
    const episodeSeason = parseInt(season, 10);

    Show.findById(SHOW_ID, (err, show) => {
      debug(err);

      if (err) {
        return done(err, null);
      }

      if (season) {
        const filteredEpisodes = show.episodes.filter(episode => episode.season === episodeSeason);
        return done(null, {
          season: season,
          episodes: filteredEpisodes
        });
      }

      return done(null, { episodes: show.episodes });
    });
  }

};
