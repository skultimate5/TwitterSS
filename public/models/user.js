var mongoose = require('mongoose'),
    crypto = require('crypto'),
    secrets = require('../../config/secrets')

//Define User Schema
var UserSchema = new mongoose.Schema({
    twitterId : {type: String, unique: true, required: true},
    username : {type: String, unique: true, lowercase: true, require: true},
    email : {type: String, lowercase: true},
    name : {type: String, default: ''},
    created : {type: Date, default: new Date()},
    accessToken : {type: String, required: true},
    tokenSecret: {type: String, required: true}
})

//encrypt the access token and token secret
UserSchema.methods.encrypt = function(text) {
    var algorithm = secrets.cryptos.algorithm,
        key = secrets.cryptos.key,
        cipher = crypto.createCipher(algorithm, key)

    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
}

//user to decrypt the access token and token secret
UserSchema.methods.decrypt = function(text) {
    var algorithm = secrets.cryptos.algorithm,
        key = secrets.cryptos.key,
        decipher = crypto.createDecipher(algorithm, key)

    return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8')
}

module.exports = mongoose.model('User', UserSchema)