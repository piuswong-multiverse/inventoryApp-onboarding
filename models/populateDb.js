// Create & populate sqlite database file
const db = require('./db');
const Item = require('./Item');
const Category = require('./Category');
const { random10, categoriesSeed } = require('./random');

// Add data to local db (if not using a separate db in MySQL or something)
const populateDb = async () => {

    await Item.sync().then( (res) => {
        Item.bulkCreate(random10).then(() => {
            console.log(`Successfully seeded main inventory data.`);
        })
    })
    
    await Category.sync().then( () => {
        Category.bulkCreate(categoriesSeed).then(() => {
            console.log(`Successfully seeded categories.`);
        })
    })
    
}

populateDb();