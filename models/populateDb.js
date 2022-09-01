// Create & populate sqlite database file
const db = require('../models/db');
const Item = require('../models/Item');
const { random10 } = require('./random');

// Add data to local db (if not using a separate db in MySQL or something)
Item.sync().then( (res) => {

    const input = random10; // no category property

    Item.bulkCreate(input).then(() => {
        console.log(`Successfully added data.`);
        db.close();
        console.log('Closed connection to database.');
    });

});