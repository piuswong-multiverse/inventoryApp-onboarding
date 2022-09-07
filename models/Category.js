const { Sequelize } = require('sequelize');
const db = require('./db');

const Category = db.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Category;