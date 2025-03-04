const express = require('express')
const path = require('path')
const fs = require('fs')

const router = express.Router()

// Login route
router.post('/login', (req, res, next) => {
    const { username, password } = req.body

    fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
        if (err) return next(err)

        const users = JSON.parse(data || '[]')
        const user = users.find(u => u.username === username && u.password === password)

        if (user) {
            return res.redirect('/api/dashboard')
        } else {
            return res.redirect('/api/register')
        }
    })
})

// Register route
router.post('/register', (req, res, next) => {
    const { username, password } = req.body
    const newUser = { username, password }

    fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
        if (err) return next(err)

        let users = []
        if (data) {
            users = JSON.parse(data)
        }
        users.push(newUser)

        fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) return next(err)

            res.redirect('/') // Redirect to login page
        })
    })
})

// Dashboard route
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard.html'))
})

// Contact page route
router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'))
})

// About Us page route
router.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/aboutus.html'))
})

// Events page route
router.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/events.html'))
})

// Gallery page route
router.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/gallery.html'))
})

// Faculty page route
router.get('/faculty', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/faculty.html'))
})

// Courses page route
router.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/courses.html'))
})
module.exports = router
