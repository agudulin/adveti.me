import { checkIsLoggedIn, logout } from "../actions/AuthActionCreators";
import { updateSeasonData } from "../actions/ShowActionCreators";

const AdminActions = {

  adminPage(context, route, done) {
    context.executeAction(checkIsLoggedIn, {}).then(done).catch(done);
  },

  logout(context, route, done) {
    context.executeAction(logout, {}).then(done).catch(done);
  }

};

export default AdminActions;
