import MainActions from "./pages/MainActions";
import AdminActions from "./pages/AdminActions";

import HomePage from "./pages/HomePage";
import SeasonPage from "./pages/SeasonPage";
import AdminPage from "./pages/AdminPage";

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
  },

  admin: {
    path: "/admin",
    method: "get",
    handler: AdminPage,
    action: AdminActions.adminPage
  },

  logout: {
    path: "/logout",
    method: "get",
    action: AdminActions.logout
  }

};
