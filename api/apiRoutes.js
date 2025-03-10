const express = require('express')
const path = require('path')
const fs = require('fs')

const router = express.Router()

const Student = require('../models/Student');
const Staff = require('../models/Staff');
const Course = require('../models/Course');


// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required.');
        }

        const user = await User.findOne({ username, password });

        if (user) {
            return res.redirect('/api/dashboard'); // success
        } else {
            return res.redirect('/api/register'); // fallback
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Register route
router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      // Optional: Validate input
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
  
      res.status(201).json({ ok: true, message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
    }
  });
  
// Dashboard route
// Dashboard Route
router.get('/dashboard', async (req, res) => {
    try {
        const studentCount = await Student.countDocuments();
        const staffCount = await Staff.countDocuments();
        const courseCount = await Course.countDocuments();
        const pendingEnrollments = await Student.countDocuments({ status: 'pending' }); // assuming 'status' field

        res.render('dashboard', {
            studentCount,
            staffCount,
            courseCount,
            pendingEnrollments
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

// Contact page route
router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

module.exports = router;

// About Us page route

router.get('/aboutus', async (req, res) => {
    try {
        // Fetch data from the MongoDB database
        const aboutContent = await AboutUs.findOne({});  // Assuming only one document for about us
        
        // Render the About Us page, passing the content from the database
        res.render('aboutus', { aboutContent });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching About Us content.');
    }
});

module.exports = router;

// Events page route
router.get('/events', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/events.html'))
})

// Gallery page route

router.get('/gallery', async (req, res) => {
    try {
        // If you want to dynamically load images from MongoDB, you can use something like this
        // const images = await GalleryImage.find(); // Fetch images from MongoDB (assuming a model)

        // If you are serving static images directly, you can send the static HTML file like before
        res.sendFile(path.join(__dirname, '../views/gallery.html'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;

// Faculty page route
router.get('/', async (req, res) => {
    try {
        const faculty = await Faculty.find();
        res.json(faculty);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Courses page route
router.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/courses.html'));
});

module.exports = router;

// Login page route(without credentials)
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
})
module.exports = router
