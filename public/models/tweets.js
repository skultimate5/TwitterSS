var mongoose = require('mongoose')

//Define User Schema
var TweetSchema = new mongoose.Schema({
    twitterId : {type: String, unique: true, required: true},
    //TODO: How do you store type object? Should the tweets be stored as an object?
    //tweet: {type Object, }
    tweetId : {type: String, unique: true, required: true},
    tweet : {type: String},
    tweetedBy : {type: String}
})

//Click into the tweet to get more data? (#num likes, etc.? Or link to twitter to save the api call)

//user to decrypt the access token and token secret
UserSchema.methods.decrypt = function(text) {
    var algorithm = secrets.cryptos.algorithm,
        key = secrets.cryptos.key,
        decipher = crypto.createDecipher(algorithm, key)

    return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8')
}

module.exports = mongoose.model('Tweet', TweetSchema)