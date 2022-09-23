// Server

// Initialize express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // change in deployment or as needed

// Define front-end directory
app.use(express.static('public')); // for backend testing

// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false })); // prevents nested objects as POST inputs
app.use(express.json()); // important -- loads middleware; puts POST request data in req.body


// Access database, non-API calls
const db = require('./models/db');
const { Item, Category } = require('./models/index');

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
const getOneItem = async (id) => {
    const item = await Item.findOne({
        include: Category,
        where: {
            id: id
        }
    });
    return item;
};
const getCategoryId = async (categoryString) => {
    const category = await Category.findOne({
        where: {
            name: categoryString
        }
    });
    return category.id;
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
    try{
        const data = await req.body;
        console.log("Received POST request!", data); // .body for data
        // INSERT one item w/ separate category handler (separate table in db)
        const newItem = await Item.create({
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl
        });
        data.categories.map(async (category) => {
            let id = await getCategoryId(category);
            // console.log("Category text:", category, "id:", id); // debug 
            newItem.addCategory(id);
        });
        res.send({message: `Finished creating data record for ${newItem.name}.`});  // TODO: make this run after promise completed above
    } catch (err) {
        res.send({message: err});
    }
});
// Delete one item
app.post('/api/delete', async (req,res) => {
    try{
        const data = await req.body;
        console.log("Received POST request do delete item...", data); // .body for data
        // Delete record in main table, and delete associations
        const itemToDelete = await Item.findByPk(data.id);
        await itemToDelete.destroy().then(() => {
            res.send({message: `Finished deleting data record for item id# ${data.id}, ${itemToDelete.name}.`});
        });
    } catch (err) {
        res.send({message: err});
    }
});
// Update one item
app.post('/api/update', async (req,res) => {
    try{
        const data = await req.body;
        console.log("Received POST request to update item:", data); // .body for data
        // Update (set) one item w/ separate category handler
        const itemToUpdate = await Item.findByPk(data.id);
        const updatedItem = await itemToUpdate.set({ // Using .set instead of .update because whole entry being saved together
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl
        });
        await updatedItem.save(); // don't forget this!  Or it won't save to the db...
        // Remove all old category associations and remake them // TODO make this dynamic
        const categoryList = ["floof","chonk","smol","long","hungry"];
        categoryList.map(async (categoryToCheck) => {
            let id = await getCategoryId(categoryToCheck);
            if(data.categories.indexOf(categoryToCheck)===-1){ 
                await updatedItem.removeCategory(id)
            } else {
                await updatedItem.addCategory(id);
            }
        });
        res.send({message: `Finished updating data record for ${updatedItem.name}.`});  // TODO: make this run after promise completed above
    } catch (err) {
        res.send({message: err});
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