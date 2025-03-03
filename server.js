const express = require('express')
const path = require('path')
const app = express()
const PORT = 8080

// Middlewares
const logger = require('./Middlewares/logger')
const errorHandler = require('./Middlewares/errorHandler')
const maintenance = require('./Middlewares/maintenance')
const requestTimer = require('./Middlewares/requestTimer')

// Core middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Custom middlewares
app.use(logger)
app.use(requestTimer)
app.use(maintenance)

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')))

// Mount API routes (from nodejsmodules/api)
const apiRoutes = require('./api/apiRoutes')
app.use('/api', apiRoutes)

// Serve login page at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

// Serve dashboard
app.get('/api/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'))
})

// Serve register page
app.get('/api/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
})

// Global error handler
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
