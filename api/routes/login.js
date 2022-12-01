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
    const userEmail = req.body.email
    const userPassword = req.body.password

    Signup.find()
        .then( result => {
            const userNames = []
            for(let i=0; i < result.length; i++) {
                userNames.push(result[i].email)
            }
            res.status(200).json( {entries: userNames} )
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