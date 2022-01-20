// Here we're employing Router as before, but this time we're having it use the module exported from animalRoutes.js. (Note that the .js extension is implied when supplying file names in require()).
// Doing it this way, we're using apiRoutes/index.js as a central hub for all routing functions we may want to add to the application
const router = require('express').Router();
// We've added this code so that later, when we add additional routes, they can all be exported from the same file.
const animalRoutes = require('../apiRoutes/animalRoutes');

router.use(animalRoutes);

module.exports = router;