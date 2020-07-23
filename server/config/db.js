const mongoose = require('mongoose')
const config = require('./config')

const connectDB = async () => {
    // Handle initial connection
    try {
        await mongoose.connect(config.DB.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('MongoDB Connected...')
    } catch (error) {
        console.error(error.message)
    }

    // Handle errors after initial connection
    mongoose.connection.on('error', err => {
        logError(err)
    })
}

module.exports = connectDB