const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

// connect ot database
connectDB()

// Handle cross origin request
app.use(cors())

// Body parser
app.use(express.json({ extented: false}))
app.use(express.urlencoded({ extended: false }))

// Define routes
app.use('/api/url', require('./routes/url'))
app.use('/', require('./routes/redirect'))
app.use('/api/user', require('./routes/user'))
app.use('/api/fetch', require('./routes/fetchurl'))


const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))