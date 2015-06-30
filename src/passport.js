import TwitterStrategy from "passport-twitter";
import config from "./config";
import User from "./models/UserModel";

export default function(app, passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy(config.auth.twitter, function(token, tokenSecret, profile, done) {
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(function() {
      User.findOne({ "twitter.id": profile.id }, function(err, user) {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) {
          return done(err);
        }

        // if the user is found then log them in
        if (user) {
          console.log(user);
          return done(null, user); // user found, return that user
        } else {
          // if there is no user, create them
          var newUser = new User();

          // set all of the user data that we need
          newUser.twitter.id = profile.id;
          newUser.twitter.token = token;
          newUser.twitter.username = profile.username;
          newUser.twitter.displayName = profile.displayName;

          // save our user into the database
          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  app.get("/login", function(req, res) {
    res.redirect("/auth/twitter");
  });

  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get("/auth/twitter/callback", passport.authenticate("twitter", {
    successRedirect: "/admin",
    failureRedirect: "/"
  }));
}
