const express = require('express')
const path = require('path')
const app = express()
const PORT = 8080

// Import all middlewares
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
const maintenance = require('./middlewares/maintenance')
const requestTimer = require('./middlewares/requestTimer')

// Middleware to handle JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Custom middlewares
app.use(logger)
app.use(requestTimer)
app.use(maintenance)  // This will block requests if maintenance mode is enabled

// Serve static files (optional CSS/JS/images if needed later)
app.use(express.static(path.join(__dirname, 'public')))

// Routes
const apiRoutes = require('./api/apiRoutes')
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.get('/api/dashboard', (req, res, next) => {
    // Protect dashboard using authChecker (if required)
    const authChecker = require('./middlewares/authChecker')
    authChecker(req, res, next)
}, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'))
})

app.get('/api/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
})

// Error handler at the end
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

