// Server

// Initialize express
const express = require('express');
const app = express();
const port = 3001; // change in deployment or as needed

// Define front-end directory
app.use(express.static('public')); // for backend testing

// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false })); // prevents nested objects as POST inputs
app.use(express.json()); // important -- loads middleware; puts POST request data in req.body


// Access database
const db = require('./models/db');
const { Item, Category } = require('./models/index');

// GET all
const getAllItems = async () => {
    const items = await Item.findAll({
        include: Category
    });
    return items;
};
const getAllItemNames = async () => {
    const items = await Item.findAll({
        attributes: ['id','name'],
        include: Category
    });
    return items;
};
// GET one
const getOneItem = async (id) => {
    const item = await Item.findOne({
        include: Category,
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
app.get('/items', (req,res) => {
    res.status(200).sendFile('views/all.html', {root : __dirname});
});
app.get('/items/:num', (req,res) => {
    res.status(200).sendFile('views/item.html', {root : __dirname});
});

// API
// Get all item details
app.get('/api/items', async (req, res) => {
    try {
        const allItems = await getAllItems(); // Data TBD
        // res.send(JSON.stringify(allItems));
        res.status(200).json({allItems});
    } catch(err) {
        res.send(`Error: ${err} <br/> <img src="http://placekitten.com/200/300"><br/>`); // debug
    }
});
// Get all item names and categories
app.get('/api/items/names', async (req, res) => {
    try {
        const allItemNames = await getAllItemNames(); // Data TBD
        res.status(200).json({allItemNames});
    } catch(err) {
        res.send(`Error: ${err} <br/> <img src="http://placekitten.com/200/300"><br/>`); // debug
    }
});
// Get one item details
app.get('/api/items/:num', async (req,res) => {
    try {
        const {num} = req.params;
        const item = await getOneItem(num);
        // console.log(item);
        res.status(200).json({item});
    } catch (err) {
        res.send(`Error: ${err} <br/> <img src="http://placekitten.com/100/200"><br/>`); // debug
    }
});
// Post one item
app.post('/api/item', async (req,res) => {
    // const data = { test: "blah", test2: 1234}; // debug
    const data = await req.body;
    console.log("Received POST request!", data); // .body for data
    // INSERT one item w/o categories
    Item.create({
        name: data.name,
        description: data.description,
        price: data.value,
        imageUrl: data.imageUrl
    });
    res.send({message: "Finished creating data record."}); // TODO    
});

// All other routes
app.all('*', (req, res) => {
    res.status(404).send('No page with this address here... <br/> <img src="http://placekitten.com/300/400"><br/>');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening over port ${port}...`);
});