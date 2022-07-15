// require modules
const express = require('express');
const path = require('path');
const cors = require('cors');

// import environment variables
require('dotenv').config();

// init express app
const app = express();

// use middleware
app.use(express.json()); // so that data sent in the body will be attached to req.body for post request
app.use(cors());

// use static folder
app.use(express.static(path.resolve(__dirname, 'build')));

// router (grouping similar routes)
app.use('/notes', require('./routes/notes'));

// define route handlers
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
})

// catch all route handler for 404 requests
app.use((req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, '404.html'));
})

// error handling middleware
app.use((error, req, res, next) => {
    console.error(error);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    next(error);
})

// define port
const PORT = process.env.PORT || 3001


// listen on a port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));