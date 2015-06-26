import Show from "../models/Show";

const SHOW_ID = "53e552117425f53b64000003";

export default {
  name: "show",

  read(req, resource, { season }, config, done) {
    Show.findById(SHOW_ID, (err, show) => {
      if (err) {
        return done(err, null);
      }

      if (season) {
        const filteredEpisodes = show.episodes.filter(episode => episode.season === season);
        return done(null, {
          season: season,
          episodes: filteredEpisodes
        });
      }

      return done(null, { episodes: show.episodes });
    });
  }

};
