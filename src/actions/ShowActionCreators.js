import Actions from "../constants/Actions";

const ShowActionCreators = {

  loadSeasonEpisodes(context, { season="1" }, done) {

    context.service.read("show", { season }, {}, (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_EPISODES_SUCCESS, {
          season: season,
          episodes: data.episodes
        });

        done();
      }

    );
  }

};

export default ShowActionCreators;
