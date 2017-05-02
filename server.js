var express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser')

require('dotenv').config()


// Create a new Express application.
var app = express()

app.set('views', __dirname + '/public')
app.set('view engine', 'html')

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize())
app.use(passport.session())

//Load the public files somehow
app.use(express.static('public'));   


// Define routes.
app.use(require('./public/routes'))

app.get('*', (req, res) => {
    console.log(req.user)
    res.sendFile(__dirname + '/public/index.html')
})
/*app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    res.render('profile', { user: req.user })
})*/

app.listen(3000)