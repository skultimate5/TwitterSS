'use strict'

var express = require('express'),
	router = express.Router(),
    passport = require('passport'),
    Strategy = require('passport-twitter').Strategy,
    secrets = require('.././config/secrets'),
    mongoose = require('mongoose'),
	User = require('./models/user')

mongoose.connect(secrets.db)

// Example taken from https://github.com/passport/express-4.x-twitter-example/

// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    consumerKey: secrets.twitter.consumerKey,
    consumerSecret: secrets.twitter.consumerSecret,
    callbackURL: secrets.twitter.callbackURL
}, (token, tokenSecret, profile, cb) => {
      //return cb(null, profile);
      User.findOne({twitterId: profile.id}, (err, existingUser) => {
        if (existingUser) {
            return cb(null, existingUser)
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
            return cb(err, user)
        })
    })
  })
)

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
    res.cookie('username', req.user.username, {maxAge : 900000})
    res.cookie('accessToken', req.user.accessToken, {maxAge : 900000})
    res.cookie('tokenSecret', req.user.tokenSecret, {maxAge : 900000})
    res.redirect('/')
})

router.get('/auth/twitter/logout', (req,res) =>{
    req.logOut()
    req.session.destroy((err) => {
        res.clearCookie('username')
        res.clearCookie('accessToken')
        res.clearCookie('tokenSecret')
        res.redirect('/')
    })
})

router.get('/currentUser', (req, res) => {
    res.json(req.cookies.user.twitterId)
})

router.post('/getUserById', (req, res) => {
    var username = req.body.username

    User.findOne({username : username}, (err, user) => {
        if (err) {
            res.json('Request failed: ' + err)
        }
        else{
            res.json(user)
        }
    })
})

router.use(require('./twitterCalls'))

module.exports = router