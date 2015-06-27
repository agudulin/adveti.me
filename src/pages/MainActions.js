import { loadSeasonEpisodes } from "../actions/ShowActionCreators";

const MainActions = {

  seasonPage(context, route, done) {
    const season = parseInt(route.getIn(["params", "season"]), 10);
    context.executeAction(loadSeasonEpisodes, { season }).then(done).catch(done);
  }

};

export default MainActions;
