const express = require('express')
const connectDB = require('./config/db')

const app = express()

// connect ot database
connectDB()

// Body parser
app.use(express.json({ extented: false}))

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))