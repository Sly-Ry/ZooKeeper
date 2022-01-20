// req.query - multifaceted, often combining multiple parameters.
// req.param - specific to a single property, often intended to retrieve a single record.
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Parse incoming string or array data
// Takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object.
// {extended: true} - informs our server that there may be sub-array data nested in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

// This is our way of telling the server that any time a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. 
app.use('/api', apiRoutes);
// If '/' is the endpoint, then the router will serve back our HTML routes.
app.use('/', htmlRoutes);



// The app.listen() method returns an http.Server object 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// Stop the previous server by entering 'Ctrl+c'