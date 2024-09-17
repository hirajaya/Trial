const musicModel = require('../models/musicModel');
const multer = require('multer');
const path = require('path');


// Configure Multer to save files to the "uploads" directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Name file uniquely
    }
});

const upload = multer({ storage });

// Controller to create a new music item
const createMusic = async (req, res) => {
    const { title, aName, composer, rLabel, genre, rDate } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'Music file is required' });
    }

    const musicFile = req.file.path;

    try {
        const newMusic = new musicModel({ title, aName, composer, rLabel, genre, rDate, musicFile });
        await newMusic.save();
        res.status(201).json(newMusic);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Controller to get all music items
const getAllMusic = async (req, res) => {
    try {
        const music = await musicModel.find();
        res.json(music);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Controller to update a music item
const updateMusic = async (req, res) => {
    try {
        const { title, aName, composer, rLabel, genre, rDate } = req.body;
        const id = req.params.id;

        const updatedMusic = await musicModel.findByIdAndUpdate(
            id,
            { title, aName, composer, rLabel, genre, rDate },
            { new: true }
        );

        if (!updatedMusic) {
            return res.status(404).json({ message: "Music not found" });
        }

        res.json(updatedMusic);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete a music item
const deleteMusic = async (req, res) => {
    try {
        const id = req.params.id;
        await musicModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMusic,
    upload,
    getAllMusic,
    updateMusic,
    deleteMusic
};
