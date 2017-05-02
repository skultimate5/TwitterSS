var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    User = require('../models/user'),
    secrets = require('../config/secrets')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new TwitterStrategy({
    consumerKey: secrets.twitter.consumerKey,
    consumerSecret: secrets.twitter.consumerSecret,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({twitterId: profile.id}, (err, existingUser) => {
        if (existingUser) {
            return done(null, existingUser)
        }

        var user = new User()

        user.twitterId = profile.id
        user.username = profile.username
        user.email = ''
        user.name = profile.displayName,
        user.created = new Date(),
        user.accessToken = user.encrypt(token)
        user.tokenSecret = user.encrypt(tokenSecret)

        user.save((err) => {
            return done(err, user)
        })
    })
  }
))

exports.twitter = passport.authenticate('twitter')
exports.twitterCallback = passport.authenticate('twitter', {failureRedirect: '/'})

exports.logout = (req, res) => {
    req.logout()
    req.session.destroy()
    res.redirect('/')
}