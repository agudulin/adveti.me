import Fluxible from "fluxible/addons";
import Actions from "../constants/Actions";

class ShowStore extends Fluxible.BaseStore {

  static storeName = "ShowStore"

  static handlers = {
    [Actions.LOAD_EPISODES_SUCCESS]: "onLoadEpisodesSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this.currentSeason = null;
    this.episodes = {};
  }

  onLoadEpisodesSuccess({ season, episodes }) {
    this.currentSeason = season;
    this.episodes[season] = episodes;
    this.emitChange();
  }

  getCurrentSeason() {
    return this.currentSeason;
  }

  getEpisodes() {
    return this.episodes[this.currentSeason];
  }

  dehydrate() {
    return {
      episodes: this.episodes,
      currentSeason: this.currentSeason
    };
  }

  rehydrate({ episodes, currentSeason }) {
    this.episodes = episodes;
    this.currentSeason = currentSeason;
  }

}

export default ShowStore;
