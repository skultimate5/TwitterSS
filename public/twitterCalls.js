'use strict'

var express = require('express'),
	router = express.Router(),
    secrets = require('.././config/secrets'),
    Twitter = require('twitter'),
    User = require('./models/user')

function getClient(req) {
    var user = new User(),
        userKey = user.decrypt(req.body.userKey),
        userSecret = user.decrypt(req.body.userSecret),
        client = new Twitter({
            consumer_key: process.env.TWITTER_KEY,
            consumer_secret: process.env.TWITTER_SECRET,
            access_token_key: userKey,
            access_token_secret: userSecret
        })

    return client
}

router.post('/twitter/getUser', (req, res) => {
    var username = req.body.username,
        client = getClient(req)

	client.get('users/lookup', {screen_name: username}, (error, user, response) => {
        if (error) {
            console.log('ERROR : Looking up user')
        }

        res.json(user)
    })
})

router.post('/twitter/search', (req, res) => {
    var searchString = req.body.searchString,
        client = getClient(req)

	client.get('search/tweets', {q: searchString}, (error, tweets, response) => {
        if (error) {
            console.log('ERROR : Searching tweets')
        }
        else {
            console.log('SUCCESS')
        }
		res.json(tweets)
	})
})

router.post('/twitter/getUserTimeline', (req, res) => {
    var searchUser = req.body.searchUser,
        client = getClient(req)

    //TODO : use max id to get tweets after the first 200

    client.get('statuses/user_timeline', {screen_name: searchUser, count: 50}, (error, tweets, response) => {
        if (error) {
            console.log('ERROR : Getting User Timeline')
        }
        res.json(tweets)
    })
})

router.post('/twitter/getUserFavorites', (req, res) => {
    var username = req.body.username,
        client = getClient(req)

    client.get('favorites/list', {screen_name: username, count: 50}, (error, tweets, response) => {
        if (error) {
            console.log('ERROR : Getting User Favorites')
        }
        res.json(tweets)
    })
})

module.exports = router