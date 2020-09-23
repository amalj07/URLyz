const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date(),
        expires: 43200,
        required: true
    },
    sid: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
})

const sessionSchemaModel = mongoose.model('usersessions', sessionSchema)
module.exports = sessionSchemaModel