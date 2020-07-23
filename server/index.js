const express = require('express')
const connectDB = require('./config/db')

const app = express()

// connect ot database
connectDB()

// Body parser
app.use(express.json({ extented: false}))
app.use(express.urlencoded({ extended: false }))

// Define routes
app.use('/api/url', require('./routes/url'))


const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))