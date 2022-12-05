const express = require('express')
const router = express.Router()

const Signup = require('../model/signup')

// URL -> /users/login
router.get('/', (req, res) => {
    res.status(200).json( {msg: 'GET request to /users/login'} )
})

// PATH -> /users/login/userId
// Request Parameters | Query Paramter --> Parameters which are passed in the URL for the API
router.get('/:userId', (req, res) => {
    
})

router.post('/', (req, res) => {
    // When you get the userEmail and userPassword, you will first check if the email exists in the DB entries and if it does then does the password match, if it does then the auth is successful, else you will send him an error

    // If you use find(), then the result geerated are all the enteries from the DB | Type(result) -> Array | 
    // Signup.find( {dbProperty: useRDefinedProperty} )
    // Signup.find( {email === userEmail} )
    Signup.find( {email: req.body.email} )
        .then( result => {
            if(result.length === 0) {
                res.status(400).json({messgae: 'User does not exist, try again with a different email'})
            } else {
                if(result[0].password === req.body.password) {
                    res.status(400).json({messgae: 'Auth Successful'})
                } else {
                    res.status(400).json({messgae: 'Auth Unsuccessful, check you password'})
                }
            }
        })
        .catch(err => res.status(500).json( {messgae: 'Datatbase Error', error: err} ))
})

router.patch('/', (req, res) => {
    res.status(200).json( {message: 'PATCH request to /users/login'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {message: 'DELETE request to /users/login'} )
})

module.exports = router;