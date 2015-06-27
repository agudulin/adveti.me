import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

class ShowStore extends BaseStore {

  static storeName = "ShowStore"

  static handlers = {
    [Actions.LOAD_EPISODES_SUCCESS]: "onLoadEpisodesSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this.currentSeason = null;
    this.updatedDateTime = null;
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

  getUpdatedDateTime() {
    return this.updatedDateTime;
  }

  dehydrate() {
    return {
      episodes: this.episodes,
      currentSeason: this.currentSeason,
      updatedDateTime: this.updatedDateTime
    };
  }

  rehydrate({ episodes, currentSeason, updatedDateTime }) {
    this.episodes = episodes;
    this.currentSeason = currentSeason;
    this.updatedDateTime = updatedDateTime;
  }

}

export default ShowStore;
