const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../test-auth-user/model');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    User.findOne({ email: username }, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: `Incorrect username` });
      user.checkPassword(password, (err, res) => {
        if (err) done(err);
        if (!res) return done(null, false, { message: `Incorrect password` });

        return done(null, user);
      });
    });
  }),
);

/* sessions */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
