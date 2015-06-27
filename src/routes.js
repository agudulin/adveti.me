import MainActions from "./pages/MainActions";

import HomePage from "./pages/HomePage";
import SeasonPage from "./pages/SeasonPage";

export default {

  home: {
    path: "/",
    method: "get",
    handler: HomePage,
    action: MainActions.homePage,

    title: "Adventure Time with Finn & Jake",
    description: "Adveti.me — все серии Adventure Time (Время Приключений с Финном и Джейком) с русской, английской озвучкой и субтитрами"
  },

  season: {
    path: "/season/:season",
    method: "get",
    handler: SeasonPage,
    action: MainActions.seasonPage,

    title: "Adventure Time with Finn & Jake"
  }

};
