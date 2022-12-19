// Responsible for handling all your reqs and responses
// Express Application
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')

const app = express()

const homeRoute = require('./api/routes/home')
const loginRoute = require('./api/routes/login')
const signupRoute = require('./api/routes/signup')
const logoutRoute = require('./api/routes/logout')

// MIDDLEWARES --> Any piece of code which will be executed after the server and before the routes
// Eg -> DB Connection...
// 1. nodemon -> A middleware which is a dev-middleware; 

// 2. body-parser -> Gives you an access to req.body object
// extentd: false --> Only work on string and array type data
// extended: true --> Any type of data
app.use( bodyParser.urlencoded( {extended: false} ) )
app.use( bodyParser.json() )
// FE --> xhr.setRequestHeader( 'Access-Control-Allow-Orgin', 'http://localhost:30000' )
// FE --> xhr.setRequestHeader( 'Access-Control-Allow-Orgin', '*' )
app.use( cors() )

// Using the session --> Configuring a session by giving options
app.use( session( {
    // Forces the session to be saved back to the session store, even if the session was never modified during the request.
    resave: true,
    // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified
    saveUninitialized: true,
    // VVIMP --> This is the secret used to sign the session cookie. This can be either a string for a single secret, or an array of multiple secrets. If an array of secrets is provided, only the first element will be used to sign the session ID cookie, while all the elements will be considered when verifying the signature in requests.
    secret: ['for', 'security', 'secret'],
    secret: 'secret',
    // Specifies the number (in milliseconds) to use when calculating the age of the session.
    // cookie: {
    //     maxAge: 3200000
    // }
} ) )

// 3. morgan --> DEV DEP --> Logger middleware --> Any request made on the API, will be logged in the console
app.use( morgan('dev') )

// 4. mongoose -> Make a DB connection before the routes are managed --> .connect( connectionString )
mongoose.connect( 'mongodb+srv://arunkudiyal:examplepwd@cluster0.2pssb.mongodb.net/cu-21-users?retryWrites=true&w=majority' )
    .then(console.log('Connection to DB successful!'))
    .catch(error => console.log(err))

// try {
//     async () => await mongoose.connect( 'mongodb+srv://arunkudiyal:examplepwd@cluster0.2pssb.mongodb.net/?retryWrites=true&w=majority' )
// } catch {
//     console.log('Error erroured while connecting...')
// }
// SYNTAX -> app.use( 'path', (request, response) => {...} )

// Managing your route
// localhost:5001/users
// app.use( '/users', (req, res) => {
//     res.status(200).json( {message: 'GET request to /users'} )
// } )

// SYNTAX -> app.use('path', nameOfFile)
app.use('/', homeRoute)
app.use('/users/login', loginRoute)
app.use('/users/signup', signupRoute)
app.use('/users/logout', logoutRoute)

// Throwing an error for the base('/') route
// localhost:5001/ --> Home Route
app.use( (req, res) => {
    // res.status().json( {JS Object} )
    res.status(404).json( {msg: 'Seems like youre lost, please try again with a route!'} )
} )

module.exports = app;