// Testing the creation of SQL database

const db = require('../models/db');
const Item = require('../models/Item');


// // Add data to db to check
// Item.sync().then( (res) => {
//     Item.create({
//         name: "Box",
//         description: "It's a box...",
//         price: 2.99,
//         imageUrl: "http://placekitten.com/g/250/250",
//     }).then((res) => {
//         console.log(`Successfully added data for id ${res.id}`);
//         db.close();
//         console.log('Closed connection to database.');
//     });
// });

describe('Basic database creation', () => {
    test('Can read all properties of one item', async () => {
        // following line is OK for testing but bad for production, clearing db?
        await db.sync({force:true});
        let input = 
            {
                id: 1,
                name: "Box",
                description: "It's a box...",
                price: 2.99,
                imageUrl: "http://placekitten.com/g/250/250",
            }
            // {
            //     name: "Pen",
            //     description: "Looks like a writing utensil with ink.",
            //     price: 0.10,
            //     imageUrl: "http://placekitten.com/g/200/200",
            // }
        ;
        let firstItem = await Item.create(input);
        console.log(`Successfully added data for id ${firstItem.id}`);
        const check = await Item.findAll({
            where: {
                id: 1
            }
        });
        console.log("check", check[0].dataValues.id); // debug
        expect(check[0].dataValues.id).toBe(1);
        // expect(firstItem.name.toBe(input.name));
    });
});
