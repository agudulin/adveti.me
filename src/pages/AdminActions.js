import { checkIsLoggedIn, logout } from "../actions/AuthActionCreators";

const AdminActions = {

  adminPage(context, route, done) {
    context.executeAction(checkIsLoggedIn, {}).then(done).catch(done);
  },

  logout(context, route, done) {
    context.executeAction(logout, {}).then(done).catch(done);
  }

};

export default AdminActions;
