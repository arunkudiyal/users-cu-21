const express = require('express')
const app = express()

const loginRoute = require('./api/routes/login')
const signupRoute = require('./api/routes/signup')

// Managing my route
app.use('/users/login', loginRoute)
app.use('/users/signup', signupRoute)

// Throwing an error for the base('/') route
app.use( (req, res) => {
    res.status(404).json( {msg: 'Seems like youre lost, please try again with a route!'} )
} )

module.exports = app;