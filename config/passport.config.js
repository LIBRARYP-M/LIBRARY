const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User.model");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then((user) => {
      next(null, user);
    })
    .catch((err) => next(err));
});

const GENERIC_ERROR_MESSAGE = "Email or password are incorrect";

passport.use(
  "local-auth",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, next) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            next(null, false, { error: GENERIC_ERROR_MESSAGE });
          } else {
            return user.checkPassword(password)
              .then((match) => {
                if (!match) {
                  next(null, false, { error: GENERIC_ERROR_MESSAGE });
                } else {
                  next(null, user);
                }
              }
            );
          }
        })
        .catch((err) => next(err));
    }
  )
);

module.exports.GENERIC_ERROR_MESSAGE = GENERIC_ERROR_MESSAGE;

passport.use('google-auth', new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, next) => {
    const googleID = profile.id;
    const name = profile.displayName;
    const email = profile.emails && profile.emails[0].value || undefined;

    if (googleID && email) {
      User.findOne({
        $or: [
          { email },
          { googleID }
        ]
      })
        .then(user => {
          console.log('encuentro usuario?', user)
          if (user) {
            next(null, user)
          } else {
            // Crear uno nuevo
            return User.create({
              name,
              email,
              password: mongoose.Types.ObjectId(),
              googleID
            })
              .then(userCreated => {
                next(null, userCreated)
              })
          }
        })
        .catch(err => next(err))
    } else {
      next(null, false, { error: 'Error connecting with Google Auth' })
    }
  }
));