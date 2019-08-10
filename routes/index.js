var express = require('express');
var router = express.Router();
var config = require("../config");
var passport = require("passport");
var Users = require("../models/all").Users;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
console.log("Using passport google oauth 2.0 strategy");
passport.use(new GoogleStrategy({
  clientID: config.googleClientId,
  clientSecret: config.googleClientSecret,
  callbackURL: config.googleCallback,
},
  function (accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    var user = new Users({
      name: profile.displayName,
      image: profile.photos[0].value,
      id: profile.id,
      email: profile.emails[0].value
    })

    user.save(function (err, user) {
      if (err) {
        return cb(err);
      } else {
        return cb(null, user);
      }
    })
  }
));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

function checkAuthentication(req, res, next) {
  if (req.user && req.user.id) {
    next();
  } else {
    res.redirect(config.serverRoot + 'auth/google');
  }
}
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: config.serverRoot, scope: ['email', 'profile'] }),
  function (req, res) {
    console.log("Google login success. Redirect to dashboard");
    res.redirect(config.serverRoot + "dashboard");
  }
);



router.get('/', function (req, res, next) {
  res.render('login', { title: 'CG Transcripts Application Portal | AUGSD | BITS Pilani, Hyderabad Campus', message: req.query.message })
});

router.get("/dashboard", checkAuthentication, function (req, res, next) {
  res.render("index", { title: "LOGGED IN", message: req.query.message, user: req.user })
})




module.exports = router;
