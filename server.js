const express = require('express')
const path = require('path')
const morgan = require('morgan')              // 3rd party
const helmet = require('helmet')              // 3rd party
const cors = require('cors')                  // 3rd party
const compression = require('compression')    // 3rd party
const cookieParser = require('cookie-parser') // 3rd party

const logger = require('./Middlewares/logger')
const errorHandler = require('./Middlewares/errorHandler')
const maintenance = require('./Middlewares/maintenance')
const requestTimer = require('./Middlewares/requestTimer')

const app = express()
const PORT = 8080


// Core Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 3rd Party Middlewares
app.use(morgan('dev')) // request logger
app.use(helmet()) // security headers
app.use(cors()) // cross-origin
app.use(compression()) // compress responses
app.use(cookieParser()) // parse cookies

// Custom Middlewares (your own)
app.use(logger)
app.use(requestTimer)
app.use(maintenance)

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// API Routes
const apiRoutes = require('./api/apiRoutes')
app.use('/api', apiRoutes)

// Root route - Login Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

// Dashboard
app.get('/api/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'))
})

// Register page
app.get('/api/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
})

// Global Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
