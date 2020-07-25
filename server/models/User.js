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
    password: {
        type: String,
        required: true
    },
    urlNos: {
        type: Number,
        required: true,
        default: 0
    },
    activated: {
        type: Boolean,
        required: true,
        default: false
    }
})