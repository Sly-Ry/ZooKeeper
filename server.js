// req.query - multifaceted, often combining multiple parameters.
// req.param - specific to a single property, often intended to retrieve a single record.
const fs = require('fs');
const path = require('path');
const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

// Parse incoming string or array data
// Takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object.
// {extended: true} - informs our server that there may be sub-array data nested in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));


// The get() method requires two arguments. 
// 1. './api/animals' - A string that describes the route the client will have to fetch from.
// 2. (req, res) - A callback function that will execute every time that route is accessed with a GET request.
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// A param route must come after the other GET route.
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

// A route that listens for POST request/ 
app.post('/api/animals', (req, res) => {
    // req.body is where out incoming content will be
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // add animal to json file and animals array in this function
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    }
    else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

// "/" - Brings us to the root route of the server! 
// This GET route has just one job to do, and that is to respond with an HTML page to display in the browser.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// '/aniumals' - an endpoint that we've labeled to serve an HTML page. (professional system to differentiate api paths such as adding '/api' or not based on usage).
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// '*' -  Act as a "wildcard", meaning any route that wasn't previously defined will fall under this request and will receive the homepage as the response [thus, requests for '/about' or '/contact' or '/membership' will essentially be the same now.
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// The app.listen() method returns an http.Server object 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// Stop the previous server by entering 'Ctrl+c'