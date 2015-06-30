import Show from "../models/ShowModel";
import { SHOW_ID } from "../constants/Show";
import grab from "../grab";

const debug = require("debug")("advetime");

export default {
  name: "show",

  read(req, resource, { season }, config, done) {
    const episodeSeason = parseInt(season, 10);

    Show.findById(SHOW_ID, (err, showModel) => {
      if (err) {
        return done(err, null);
      }

      if (season) {
        const filteredEpisodes = showModel.episodes.filter(episode => episode.season === episodeSeason);
        return done(null, {
          season: season,
          episodes: filteredEpisodes,
          updatedDt: showModel.updated
        });
      }

      return done(null, { updatedDt: showModel.updated });
    });
  },

  update(req, resoures, { season }, body, config, done) {
    debug(`Grab season ${season}`);

    grab(SHOW_ID, season, (err, resultShow) => {
      if (err) {
        return done(err);
      }

      resultShow.save((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
    });
  }

};
