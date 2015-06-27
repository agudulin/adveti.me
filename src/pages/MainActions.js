import { loadSeasonEpisodes, loadUpdateInfo } from "../actions/ShowActionCreators";

const MainActions = {

  homePage(context, route, done) {
    context.executeAction(loadUpdateInfo, {}).then(done).catch(done);
  },

  seasonPage(context, route, done) {
    const season = parseInt(route.getIn(["params", "season"]), 10);
    context.executeAction(loadSeasonEpisodes, { season }).then(done).catch(done);
  }

};

export default MainActions;
