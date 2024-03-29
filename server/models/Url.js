const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        reqiured: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        reqiured: true,
        default: 'active'
    },
    visits: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: String,
        default: Date.now
    }
})

const urlSchemaModel = mongoose.model('urls', urlSchema)

module.exports = urlSchemaModel