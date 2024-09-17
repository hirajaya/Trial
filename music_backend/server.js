const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const musicRoutes = require('./routes/musicRoutes');

// Create an instance of express
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected!');
}).catch((err) => {
    console.log(err);
});

// Use the music routes
app.use(musicRoutes);

// Start the server
const port = 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
