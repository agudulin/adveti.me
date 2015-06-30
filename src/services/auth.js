import User from "../models/UserModel";

const error403 = { statusCode: 403, msg: "Permission denied" };
const debug = require("debug")("advetime");

function isLoggedInAsAdmin(req, callback) {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, (err, user) => {
      if (err || user.role !== "ADMIN") {
        return callback(err || error403);
      }
    });
    return callback(null);
  }
  callback(error403);
}

export default {
  name: "auth",

  read(req, resource, {}, config, done) {
    isLoggedInAsAdmin(req, (err) => {
      if (err) {
        return done(err, null);
      }

      done(null, { user: req.user });
    });
  },

  delete(req, resource, params, config, done) {
    debug(req.user);

    if (req.isAuthenticated()) {
      req.logout();
    }
    done(null);
  }
};
