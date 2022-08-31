// create db

// Initialize Sequelize library to access SQL db
const { Sequelize } = require('sequelize');
const path = require('path');

// syntax differs according to dialect: https://sequelize.org/docs/v6/getting-started/
// sqlite viewer here for Edge: https://microsoftedge.microsoft.com/addons/detail/sqlite-viewer-wasm-edit/gljmogcmgknikhkbejpiapnakflhnnfe
const db = new Sequelize({ // can add username/pw
    dialect: 'sqlite',
    storage: path.join(__dirname,'inventory.sqlite'), 
    // storage: ':memory:', // can also do in-memory db to auto-flush data
    // logging: console.log 
    logging: false // can set to false to disable
});

module.exports = db;