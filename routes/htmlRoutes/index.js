const path = require('path');
const router = require('express').Router();

// "/" - Brings us to the root route of the server! 
// This GET route has just one job to do, and that is to respond with an HTML page to display in the browser.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// '/aniumals' - an endpoint that we've labeled to serve an HTML page. (professional system to differentiate api paths such as adding '' or not based on usage).
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});
  
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// '*' -  Act as a "wildcard", meaning any route that wasn't previously defined will fall under this request and will receive the homepage as the response [thus, requests for '/about' or '/contact' or '/membership' will essentially be the same now.
router.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;