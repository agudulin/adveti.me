export default {
  name: "show",

  read(req, resource, { season }, config, done) {
    done(null, {
      season: season,
      episodes: [{ n: 1 }, { n: 2 }]
    });
  }

};
