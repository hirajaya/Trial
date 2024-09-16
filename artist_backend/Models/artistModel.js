const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt

const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    artistType: { type: String, required: true },
    profileImage: { type: String },
    username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Store plain text password
});



const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
