const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const loggedInUser = req.session.user

    // to logout, you need to kill/destroy the session which was created
    req.session.destroy()
    res.status(200).json( {message: 'User Logged Out Successfully', loggedOutUserDetails: loggedInUser} )
})

module.exports = router