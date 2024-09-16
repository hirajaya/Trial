const bcrypt = require('bcrypt');
const Artist = require('../Models/artistModel');

exports.registerArtist = async (req, res) => {
    try {
        const { name, email, phoneNumber, artistType, username, password } = req.body;
        const profileImage = req.file ? req.file.path : '';

        // Check if username already exists
        const existingArtist = await Artist.findOne({ username });
        if (existingArtist) {
            return res.status(400).json({ message: 'Username already exists. Please choose another.' });
        }

        const newArtist = new Artist({
            name,
            email,
            phoneNumber,
            artistType,
            profileImage,
            username,
            password
        });

        await newArtist.save();
        res.status(201).json({ message: 'Artist registered successfully', artist: newArtist });
    } catch (error) {
        console.error('Error registering artist:', error);
        res.status(500).json({ message: 'Error registering artist', error: error.message });
    }
};

exports.loginArtist = async (req, res) => {
  
  const { username, password } = req.body;

    try {
        // Find artist by username
        const artist = await Artist.findOne({ username });

        if (!artist) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Directly compare plain text passwords
        if (artist.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Generate a token if needed (for example, using JWT)
        const token = 'dummy_token'; // Replace with actual token generation if required

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};




exports.getArtistProfile = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching artist profile', error: error.message });
    }
};
