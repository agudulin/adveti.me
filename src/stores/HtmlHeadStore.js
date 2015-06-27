import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

const debug = require("debug")("advetime");

class HtmlHeadStore extends BaseStore {

  static storeName = "HtmlHeadStore"

  static handlers = {
    [Actions.NAVIGATE_START]: "handleNavigateStart",
    [Actions.NAVIGATE_SUCCESS]: "handleNavigateSuccess",
    [Actions.NAVIGATE_FAILURE]: "handleNavigateFailure"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.title = "Adveti.me";
    this.description = "Adveti.me";
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  handleNavigateStart() {
    this.title = "Loading...";
    this.emitChange();
  }

  handleNavigateSuccess(route) {
    debug(route.get("name"));

    this.title = route.get("title");
    this.description = route.get("description");

    this.emitChange();
  }

  handleNavigateFailure(error) {
    this.title = "500";
    this.emitChange();
  }

}

export default HtmlHeadStore;
