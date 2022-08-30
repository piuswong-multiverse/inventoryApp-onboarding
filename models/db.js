// create db

// Initialize Sequelize library to access SQL db
const { Sequelize } = require('sequelize');

// syntax differs according to dialect: https://sequelize.org/docs/v6/getting-started/
// sqlite viewer here for Edge: https://microsoftedge.microsoft.com/addons/detail/sqlite-viewer-wasm-edit/gljmogcmgknikhkbejpiapnakflhnnfe
const db = new Sequelize({ // can add username/pw
    dialect: 'sqlite',
    // storage: './models/inventory.sqlite', 
    storage: ':memory:', // can also do in-memory db to auto-flush data
    logging: console.log // can set to false to disable
});

// Define the model (or class) for items (like row headers for db)
const Item = db.define('Items', {
    id: { // primary key
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: "Unknown name",
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    price: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
    }
    // category: {  // this is a many-to-many relationship TBD later
    //     type: Sequelize.STRING,
    //     defaultValue: ""
    // }
});

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

// module.exports = db;