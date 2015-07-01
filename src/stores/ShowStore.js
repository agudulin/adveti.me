import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

class ShowStore extends BaseStore {

  static storeName = "ShowStore"

  static handlers = {
    [Actions.LOAD_EPISODES_SUCCESS]: "onLoadEpisodesSuccess",
    [Actions.LOAD_UPDATE_INFO_SUCCESS]: "onLoadUpdateInfoSuccess",
    [Actions.UPDATE_EPISODES_START]: "onUpdateEpisodesStart",
    [Actions.UPDATE_EPISODES_SUCCESS]: "onUpdateEpisodesSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this.currentSeason = null;
    this.updatedDateTime = null;
    this.episodes = {};
  }

  onLoadEpisodesSuccess({ season, episodes, updatedDt }) {
    this.currentSeason = season;
    this.episodes[season] = episodes;
    this.updatedDateTime = updatedDt;
    this.emitChange();
  }

  onLoadUpdateInfoSuccess({ updatedDt }) {
    this.updatedDateTime = updatedDt;
    this.emitChange();
  }

  onUpdateEpisodesStart() {
    this.isUpdating = true;
    this.emitChange();
  }

  onUpdateEpisodesSuccess() {
    this.isUpdating = false;
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

  getIsUpdating() {
    return this.isUpdating;
  }

  dehydrate() {
    return {
      episodes: this.episodes,
      currentSeason: this.currentSeason,
      updatedDateTime: this.updatedDateTime,
      isUpdating: this.isUpdating
    };
  }

  rehydrate({ episodes, currentSeason, updatedDateTime, isUpdating }) {
    this.episodes = episodes;
    this.currentSeason = currentSeason;
    this.updatedDateTime = updatedDateTime;
    this.isUpdating = isUpdating;
  }

}

export default ShowStore;
