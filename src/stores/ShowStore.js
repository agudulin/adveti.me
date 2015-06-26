import Fluxible from "fluxible/addons";
import Actions from "../constants/Actions";

class ShowStore extends Fluxible.BaseStore {

  static storeName = "ShowStore"

  static handlers = {
    [Actions.LOAD_EPISODES_SUCCESS]: "onLoadEpisodesSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this.season = null;
    this.episodes = [];
  }

  onLoadEpisodesSuccess({ season, episodes }) {
    this.season = season;
    this.episodes = episodes;
    this.emitChange();
  }

  getCurrentSeason() {
    return this.season;
  }

  getEpisodes() {
    return this.episodes;
  }

  dehydrate() {
    return {
      episodes: this.episodes,
      season: this.season
    };
  }

  rehydrate({ episodes, season }) {
    this.episodes = episodes;
    this.season = season;
  }

}

export default ShowStore;
