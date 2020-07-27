const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    urlNos: {
        type: Number,
        required: true,
        default: 0
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
})

const User = mongoose.model('users', userSchema)
module.exports = User