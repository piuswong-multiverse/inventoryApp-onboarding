// Testing the creation of SQL database

const db = require('../models/db');
const Item = require('../models/Item');


// Add data to db to check
Item.sync().then( (res) => {
    Item.create({
        name: "Box",
        description: "It's a box...",
        price: 2.99,
        imageUrl: "http://placekitten.com/g/250/250",
    }).then((res) => {
        console.log(`Successfully added data for id ${res.id}`);
        db.close();
        console.log('Closed connection to database.');
    });
});