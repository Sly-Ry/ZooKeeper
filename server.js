// req.query - multifaceted, often combining multiple parameters.
// req.param - specific to a single property, often intended to retrieve a single record.

const { query } = require('express');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        }
        else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in that personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one 
            // of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    return filteredResults;
};

// Takes in the id and array of animals and returns a single animal object,
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

// The get() method requires two arguments. 
// 1. './api/animals' - A string that describes the route the client will have to fetch from.
// 2. (req, res) - A callback function that will execute every time that route is accessed with a GET request.
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    };
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

// The app.listen() method returns an http.Server object 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

const { animals } = require('./data/animals');

// Stop the previous server by entering 'Ctrl+c'