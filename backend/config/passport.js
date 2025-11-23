const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Usuario.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let usuario = await Usuario.findOne({ googleId: profile.id });

        if (usuario) {
          return done(null, usuario);
        }

        usuario = await Usuario.create({
          googleId: profile.id,
          nombre: profile.displayName,
          email: profile.emails[0].value,
          password: 'google-oauth-' + profile.id
        });

        done(null, usuario);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;