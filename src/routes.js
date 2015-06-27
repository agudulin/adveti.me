import MainActions from "./pages/MainActions";

import HomePage from "./pages/HomePage";
import SeasonPage from "./pages/SeasonPage";

export default {

  home: {
    path: "/",
    method: "get",
    handler: HomePage,
    action: MainActions.homePage
  },

  season: {
    path: "/season/:season",
    method: "get",
    handler: SeasonPage,
    action: MainActions.seasonPage
  }

};
