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

// GET one
const getOneItem = async (id) => {
    const item = await Item.findOne({
        where: {
            id: id
        }
    });
    return item;
};

// Define routes; need async if accessing db
app.get('/', (req,res) => {
    res.status(200).sendFile('views/index.html', {root : __dirname});
});

// API
// Get all items
app.get('/api/items', async (req, res) => {
    // UI TBD
    try {
        const allItems = await getAllItems(); // Data TBD
        // res.send(JSON.stringify(allItems));
        res.status(200).json({allItems});
    } catch(err) {
        res.send(`Error: ${err} <br/> <img src="http://placekitten.com/200/300"><br/>`); // debug
    }
});
// Get one item
app.get('/api/items/:num', async (req,res) => {
    try {
        const {num} = req.params;
        const item = await getOneItem(num);
        console.log(item);
        res.status(200).json({item});
    } catch (err) {
        res.send(`Error: ${err} <br/> <img src="http://placekitten.com/100/200"><br/>`); // debug
    }
});

// All other routes
app.all('*', (req, res) => {
    res.status(404).send('No page with this address here... <br/> <img src="http://placekitten.com/300/400"><br/>');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening over port ${port}...`);
});