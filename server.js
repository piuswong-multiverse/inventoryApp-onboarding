// Server

// Initialize express
const express = require('express');
const app = express();
const port = 3000; // change in deployment or as needed

// Define front-end directory
app.use(express.static('public')); // for React build later?

// Access database

// Define routes
app.get('/', (req, res) => {
    // UI TBD
    res.send('Main page data goes here! <br/> <img src="http://placekitten.com/200/300">'); // debug
});

// Start server
app.listen(port, () => {
    console.log(`Server listening over port ${port}...`);
});