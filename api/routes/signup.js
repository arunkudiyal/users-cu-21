const express = require('express')
const router = express.Router()

// localhost:5001/users/signup/
// GET -> Reading the data
// POST -> Write the data

router.get('/', (req, res) => {
    res.status(200).json( {msg: 'GET request to /users/signup'} )
})

router.post('/', (req, res) => {
    // Expecting the   and userPassword from the user to write in the DB
    // const variable = req.body.propertNameFromRequest

    // NOTE --> By default, NodeJS does not have access to request.body
    const userEmail = req.body.email
    const userPassword = req.body.password

    const createdUser = {
        email: userEmail,
        password: userPassword
    }

    res.status(201).json( {message: 'User Created', credentials: createdUser} )
})

router.patch('/', (req, res) => {
    res.status(200).json( {message: 'PATCH request to /users/signup'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {message: 'DELETE request to /users/signup'} )
})

module.exports = router;