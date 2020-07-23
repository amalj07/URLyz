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
    date: {
        type: String,
        default: Date.now
    }
})

const urlSchemaModel = mongoose.model('urls', urlSchema)

module.exports = urlSchemaModel