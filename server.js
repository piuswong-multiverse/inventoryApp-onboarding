// Server

// Initialize express
const express = require('express');
const app = express();
const port = 3000; // change in deployment or as needed

// Define front-end directory
app.use(express.static('public')); // for React build later?

// Access database
const db = require('./models/db');
const Item = require('./models/Item');

// GET all
const getAllItems = async () => {
    const items = await Item.findAll();
    return items;
};

// Define routes; need async if accessing db
app.get('/', async (req, res) => {
    // UI TBD
    try {
        const allItems = await getAllItems(); // Data TBD
        // res.send(JSON.stringify(allItems));
        res.status(200).json({allItems});
    } catch(err) {
        res.send(`Error: ${err} <br/> <img src="http://placekitten.com/200/300"><br/>`); // debug
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server listening over port ${port}...`);
});