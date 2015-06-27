import Show from "../models/Show";
import { SHOW_ID } from "../constants/Show";

const debug = require("debug")("advetime");

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
          episodes: filteredEpisodes,
          updatedDt: show.updated
        });
      }

      return done(null, { updatedDt: show.updated });
    });
  }

};
