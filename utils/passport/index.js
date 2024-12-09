const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  OAUTH_CONFIGS: { google },
} = require("../constants");

const googleCB = (accessToken, refreshToken, profile, callback) => {
  try {
    return callback(null, profile);
  } catch (error) {
    console.log("Error : ", error);
    return callback(error, null);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientId,
      clientSecret: google.secret,
      callbackURL: "/api/user/google/callback",
      scope: ["profile", "email"],
    },
    googleCB
  )
);

passport // Serialize and deserialize user for session management
  .serializeUser((user, done) => {
    done(null, user);
  });

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;