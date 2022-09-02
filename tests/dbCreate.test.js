// Testing the creation of SQL database

const db = require('../models/db');
const Item = require('../models/Item');

describe('Basic database creation', () => {

    // following line is OK for testing but bad for production, clearing db?
    beforeAll(async () => {
        await db.sync({force:true});
    });

    test('Can read all properties of one item', async () => {

        let input = 
            {
                name: "Box",
                description: "It's a box...",
                price: 2.99,
                imageUrl: "http://placekitten.com/g/250/250",
            }
        ;
        let firstItem = await Item.create(input);
        // console.log(`Successfully added data for id ${firstItem.id}`);
        const check = await Item.findAll({
            where: {
                id: 1
            }
        });
        // console.log("check", check); // debug
        expect(check[0].dataValues.name).toBe(input.name);
        expect(check[0].dataValues.price).toBe(input.price);
        expect(check[0].dataValues).toMatchObject(input);
    });

    test('Can read all properties of more than one item', async () => {
        // following line is OK for testing but bad for production, clearing db?
        await db.sync({force:true});
        let input = [
            {
                name: "Box",
                description: "It's a box...",
                price: 2.99,
                imageUrl: "http://placekitten.com/g/250/250",
            },
            {
                name: "Pen",
                description: "Looks like a writing utensil with ink.",
                price: 0.10,
                imageUrl: "http://placekitten.com/g/200/200",
            },
            {
                name: "Pencil",
                description: "Writing utensil with graphite.",
                price: 0.05,
                imageUrl: "http://placekitten.com/g/200/210",
            }
        ];
        let newItems = await Item.bulkCreate(input);
        const check = await Item.findAll();
        // console.log("check", check, check.length); // debug
        expect(check.length).toBe(3);
        expect(check).toMatchObject(input);
    });

});
