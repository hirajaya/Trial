const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Artist = require('../Models/artistModel'); // Adjust the path as necessary
const artistController = require('../Controllers/artistController');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads-artist/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Artist login route
router.post('/login',artistController.loginArtist)

const upload = multer({ storage: storage });

// Artist registration route
router.post('/register', upload.single('profileImage'), artistController.registerArtist);

// Get artist profile route
router.get('/profile/:id', artistController.getArtistProfile);

module.exports = router;
