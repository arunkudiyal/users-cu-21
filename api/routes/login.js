const express = require('express')
const router = express.Router()

// URL -> /users/login
router.get('/', (req, res) => {
    res.status(200).json( {msg: 'GET request to /users/login'} )
})

// PATH -> /users/login/userId
// Request Parameters | Query Paramter --> Parameters which are passed in the URL for the API
router.get('/:userId', (req, res) => {
    res.status(200).json( {message: `Got a request for /users/login/${req.params.userId}`} )
})

router.post('/', (req, res) => {
    res.status(200).json( {message: 'POST request to /users/login'} )
})

router.patch('/', (req, res) => {
    res.status(200).json( {message: 'PATCH request to /users/login'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {message: 'DELETE request to /users/login'} )
})

module.exports = router;