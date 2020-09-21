const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')

const app = express()

// connect ot database
connectDB()

// Handle cross origin request
app.use(cors())

// Body parser
app.use(express.json({ extented: false}))
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.get('/myprofile', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

// Define routes
app.use('/api/shortenurl', require('./routes/shortenUrl'))
app.use('/', require('./routes/redirect'))
app.use('/api/user', require('./routes/user'))
app.use('/api/urls', require('./routes/url'))
app.use('/api/user_details', require('./routes/userDetails'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))