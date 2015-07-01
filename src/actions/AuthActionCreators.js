import Actions from "../constants/Actions";

const AuthActionCreators = {

  checkIsLoggedIn(context, {}, done) {
    context.service.read("auth", {}, {}, (err, data) => {
      if (err) {
        return done(err);
      }

      context.dispatch(Actions.AUTH_SUCCESS, { user: data.user });

      done();
    });
  },

  logout(context, {}, done) {
    context.service.delete("auth", {}, {}, (err, data) => {
      if (err) {
        return done(err);
      }

      context.dispatch(Actions.AUTH_LOGOUT, {});
      done({ statusCode: 403 });
    });
  }

};

export default AuthActionCreators;
