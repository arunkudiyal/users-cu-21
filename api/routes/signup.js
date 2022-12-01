const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()

// import the model
const Signup = require('../model/signup')

// localhost:5001/users/signup/
// GET -> Reading the data
// POST -> Write the data

router.get('/', (req, res) => {
    res.status(200).json( {msg: 'GET request to /users/signup'} )
})

router.post('/', (req, res) => {
    // Expecting the userEmail and userPassword from the user to write in the DB
    // const variable = req.body.propertNameFromRequest

    // NOTE --> By default, NodeJS does not have access to request.body

    // Store the value of userEmail & userPassword in the database
    const user = new Signup({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    })

    user.save()
        .then(result => res.status(201).json( {message: 'User Created', userDetails: result} ))
        .catch(error => res.status(500).json( {message: 'error occured in the DB', err: error} ))
})

router.patch('/', (req, res) => {
    res.status(200).json( {message: 'PATCH request to /users/signup'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {message: 'DELETE request to /users/signup'} )
})

module.exports = router;