import Actions from "../constants/Actions";

const ShowActionCreators = {

  loadUpdateInfo(context, {}, done) {
    context.service.read("show", {}, { timeout: 20000 }, (err, data) => {
      if (err) {
        return done(err);
      }

      context.dispatch(Actions.LOAD_UPDATE_INFO_SUCCESS, {
        updatedDt: data.updatedDt
      });

      done();
    });
  },

  loadSeasonEpisodes(context, { season=1 }, done) {

    context.service.read("show", { season }, { timeout: 20000 }, (err, data) => {
      if (err) {
        return done(err);
      }

      context.dispatch(Actions.LOAD_EPISODES_SUCCESS, {
        season: season,
        episodes: data.episodes,
        updatedDt: data.updatedDt
      });

      done();
    });
  },

  updateSeasonData(context, { season }, done) {
    context.dispatch(Actions.UPDATE_EPISODES_START);

    context.service.update("show", { season }, {}, { timeout: 20000 }, (err, data) => {
      if (err) {
        return done(err);
      }

      context.dispatch(Actions.UPDATE_EPISODES_SUCCESS, {
        season: season
      });

      done();
    });
  }

};

export default ShowActionCreators;
