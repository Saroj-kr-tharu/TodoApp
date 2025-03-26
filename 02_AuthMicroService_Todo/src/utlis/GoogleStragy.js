const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_FUNCTION,
} = require("../config/serverConfig");
const { LoginWithControllter } = require("../Controllers/oAuthController");

const GoogleProvider = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_FUNCTION,
  },
  async (accessToken, refreshToken, profile, done) => {
    await LoginWithControllter(profile, done);
  }
);

module.exports = GoogleProvider;
