const mongoose = require('mongoose');

// Creating the music schema
const musicSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    aName: {
        required: true,
        type: String
    },
    composer: {
        required: true,
        type: String
    },
    rLabel: {
        required: true,
        type: String
    },
    genre: {
        required: true,
        type: String
    },
    rDate: Date,
    musicFile: {
        type: String,  // Storing the file path
        required: true
    }
});

// Creating the music model
const musicModel = mongoose.model('Music', musicSchema);

module.exports = musicModel;
