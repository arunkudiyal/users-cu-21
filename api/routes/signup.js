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

    Signup.find( {email: req.body.email} )
        .then( result => {
            // If the email does not exist in the DB
            if(result.length === 0) {
                user.save()
                // result -> type -> Object
                // .then(result => res.status(201).json( {message: 'User Signup Successful!', userEmail: result.email, userPassword: result.password} ))
                .then(result => res.status(201).json( {message: 'User Signup Successful!', userDetails: result} ))
                .catch(error => res.status(500).json( {message: 'error occured in the DB', err: error} ))
            } else {
                res.status(400).json( {message: 'Email already exists, try again with a different email'} )
            }
        })
        .catch(error => res.status(500).json( {message: 'error occured in the DB', err: error} ))
})

router.patch('/', (req, res) => {
    const userEmail = req.body.email
    const userOldPassword = req.body.password
    const userNewPassword = req.body.newPassword

    Signup.find( {email: userEmail} )
        .then( result => {
            // Email entered in the update form is wrong
            if(result.length === 0) {
                res.status(400).json( {message: 'User does not exist'} )
            } else {
                if(result[0].password === userOldPassword) {
                    updatedUser = {
                        _id: result[0]._id,
                        email: result[0].email,
                        password: userNewPassword
                    }
                    Signup.findByIdAndUpdate(result[0]._id, updatedUser)
                        .then(updatedResult => res.status(200).json( {message: 'User Details Updated', update: updatedResult} ) )
                        .catch(err => res.status(500).json( {message: 'error occured in the DB', err: err} ))
                } else {
                    res.status(400).json( {message: 'Authentication Failed!'} )
                }
            }
        } )
        .catch(err => res.status(500).json( {message: 'error occured in the DB', err: error} ))
})

router.delete('/', (req, res) => {
    res.status(200).json( {message: 'DELETE request to /users/signup'} )
})

module.exports = router;