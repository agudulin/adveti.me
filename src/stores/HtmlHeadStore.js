import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import { TITLE, DESCRIPTION} from "../constants/Html";

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
    this.title = TITLE;
    this.description = DESCRIPTION;
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

    this.title = route.get("title") || TITLE;
    this.description = route.get("description") || DESCRIPTION;

    this.emitChange();
  }

  handleNavigateFailure(error) {
    this.title = error.statusCode || "Error";
    this.emitChange();
  }

}

export default HtmlHeadStore;
