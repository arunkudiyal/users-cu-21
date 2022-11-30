// Responsible for handling all your reqs and responses
// Express Application
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const loginRoute = require('./api/routes/login')
const signupRoute = require('./api/routes/signup')

// MIDDLEWARES --> Any piece of code which will be executed after the server and before the routes
// Eg -> DB Connection...
// 1. nodemon -> A middleware which is a dev-middleware; 
// 2. body-parser -> Gives you an access to req.body object
app.use( bodyParser.urlencoded() )
app.use( bodyParser.json() )

// SYNTAX -> app.use( 'path', (request, response) => {...} )

// Managing your route
// localhost:5001/users
// app.use( '/users', (req, res) => {
//     res.status(200).json( {message: 'GET request to /users'} )
// } )

// SYNTAX -> app.use('path', nameOfFile)
app.use('/users/login', loginRoute)
app.use('/users/signup', signupRoute)

// Throwing an error for the base('/') route
// localhost:5001/ --> Home Route
app.use( (req, res) => {
    // res.status().json( {JS Object} )
    res.status(404).json( {msg: 'Seems like youre lost, please try again with a route!'} )
} )

module.exports = app;