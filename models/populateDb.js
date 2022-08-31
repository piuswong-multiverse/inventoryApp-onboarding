// Create & populate sqlite database file
const db = require('../models/db');
const Item = require('../models/Item');

// Add data to local db (if not using a separate db in MySQL or something)
Item.sync().then( (res) => {

    const input = [
        {
            id: 1,
            name: "Box",
            description: "It's a box...",
            price: 2.99,
            imageUrl: "http://placekitten.com/g/250/250",
        },
        {

            id: 2,
            name: "Pen",
            description: "Looks like a writing utensil with ink.",
            price: 0.10,
            imageUrl: "http://placekitten.com/g/200/200",
        }
    ];

    Item.bulkCreate(input).then(() => {
        console.log(`Successfully added data.`);
        db.close();
        console.log('Closed connection to database.');
    });

});