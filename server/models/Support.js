const mongoose = require('mongoose')

const supportSchema = new mongoose.Schema({
    supportId: {
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
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const supportSchemaModel = mongoose.model('supports', supportSchema)

module.exports =supportSchemaModel