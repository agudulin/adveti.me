import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

class AuthStore extends BaseStore {

  static storeName = "AuthStore"

  static handlers = {
    [Actions.AUTH_SUCCESS]: "onAuthSuccess",
    [Actions.AUTH_LOGOUT]: "onLogout"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this.user = null;
  }

  onAuthSuccess({ user }) {
    this.user = user;
    this.emitChange();
  }

  onLogout() {
    this.user = null;
    this.emitChange();
  }

  getUser() {
    return this.user;
  }

  dehydrate() {
    return {
      user: this.user
    };
  }

  rehydrate({ user }) {
    this.user = user;
  }

}

export default AuthStore;
