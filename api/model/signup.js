// Model -> A file which contains the structure and type of the data to be written in the DB (Schema)
const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String
})

module.exports = mongoose.model('Signup', signupSchema)