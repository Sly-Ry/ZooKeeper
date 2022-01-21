const router = require('express').Router();
const { 
    filterByQuery, 
    findById, 
    createNewAnimal, 
    validateAnimal 
} = require('../../lib/animals');
const { animals } = require('../../data/animals');


// The get() method requires two arguments. 
// 1. '/animals' - A string that describes the route the client will have to fetch from.
// 2. (req, res) - A callback function that will execute every time that route is accessed with a GET request.
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// A param route must come after the other GET route.
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    }
    else {
        res.send(404);
    }
});

// A route that listens for POST request/ 
router.post('/animals', (req, res) => {
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

module.exports = router;