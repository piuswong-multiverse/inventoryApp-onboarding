// Create & populate sqlite database file
const sequelize = require('sequelize');
const db = require('./db');
const { Item, Category } = require('./index');
const { random10, categoriesSeed } = require('./random');

// Add data to local db (if not using a separate db in MySQL or something)
const populateDb = async () => {

    // don't call .sync() for every model (can mess up associations); call sequelize.sync() once
    await db.sync().then( (res) => {
        Item.bulkCreate(random10).then(() => {
            console.log(`Successfully seeded main inventory data.`);
        });
        Category.bulkCreate(categoriesSeed).then(() => {
            console.log(`Successfully seeded categories.`);
        });
    })
    
}

// populate db and associate categories
const associateCategories = async () => {
    await populateDb();
    // if needing loops, need async loop
    let items = await Item.findAll();
    for await (const item of items){
        await item.addCategory(Math.floor(Math.random()*5));
        // console.log(item.id); // debug    
    }
}

associateCategories();
