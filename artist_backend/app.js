const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./Config/db');
const bodyParser = require('body-parser');
const path = require('path');
const artistRoutes = require('./Routes/artistRoute');
const userRoutes = require('./Routes/userRoute');
const postRoutes = require('./Routes/PostRoute');


// Database connection
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type']
}));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads-artist'));
app.use('/uploads', express.static('uploads-user'));
app.use('/uploads', express.static('uploads')); 

// Routes
app.use('/api/artists', artistRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', postRoutes);




// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
