const { Sequelize } = require('sequelize');
const db = require('./db');

// Define the model (or class) for items (like row headers for db)
const Item = db.define('Items', {
    id: { // primary key
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
});

module.exports = Item;