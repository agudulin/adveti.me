import { loadSeasonEpisodes } from "../actions/ShowActionCreators";

const MainActions = {

  seasonPage(context, route, done) {
    const season = route.getIn(["params", "season"]);
    context.executeAction(loadSeasonEpisodes, { season }, done);
  }

};

export default MainActions;
