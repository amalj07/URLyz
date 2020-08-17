const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
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

const sessionSchemaModel = mongoose.model('sessions', sessionSchema)
module.exports = sessionSchemaModel