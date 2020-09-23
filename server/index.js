const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const isAuthenticated = require('./controllers/auth')

const app = express()

// connect ot database
connectDB()

// Handle cross origin request
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
  };
app.use(cors(corsOptions))

// Body parser
app.use(express.json({ extented: false}))
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

// app.use(express.static(path.join(__dirname, '../dist')))

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../dist', 'index.html'))
// })


// Define routes
app.use('/api/shortenurl', require('./routes/shortenUrl'))
app.use('/', require('./routes/redirect'))
app.use('/api/user', require('./routes/user'))
app.use('/api/urls', isAuthenticated, require('./routes/url'))
app.use('/api/user_details',isAuthenticated, require('./routes/userDetails'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))