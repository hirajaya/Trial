const express = require('express');
const musicModel = require('../models/musicModel');
const multer = require('multer');
const router = express.Router();

// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');  // Folder to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  // Save with unique name
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // 10 MB file size limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav' || file.mimetype === 'audio/ogg') {
            cb(null, true);
        } else {
            cb(new Error('Only .mp3, .wav, and .ogg formats allowed!'), false);
        }
    }
});

// Create a new music item with a file upload
router.post('/', upload.single('musicFile'), async (req, res) => {
    try {
        const { title, aName, composer, rLabel, genre, rDate } = req.body;
        const newMusic = new musicModel({
            title,
            aName,
            composer,
            rLabel,
            genre,
            rDate,
            filePath: req.file.path  // Save the uploaded file path
        });
        await newMusic.save();
        res.status(201).json(newMusic);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Fetch all music items
router.get('/', async (req, res) => {
    try {
        const music = await musicModel.find();
        res.json(music);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
