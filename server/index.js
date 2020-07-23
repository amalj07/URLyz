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


const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))