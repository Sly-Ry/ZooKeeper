const express = require('express');
const app = express();

// The get() method requires two arguments. 
// 1. './api/animals' - A string that describes the route the client will have to fetch from.
// 2. (req, res) - A callback function that will execute every time that route is accessed with a GET request.
app.get('./api/animals', (req, res) => {
    res.send('Hello');
});

// The app.listen() method returns an http.Server object 
app.listen(3001, () => {
    console.log('API server now on port 3001!');
});

const { animals } = require('./data/animals');