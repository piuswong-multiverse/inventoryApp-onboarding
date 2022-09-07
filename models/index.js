const db = require('./db');
const Item = require('./Item');
const Category = require('./Category');

// make associations
Item.belongsToMany(Category, {through: "item_category"});
Category.belongsToMany(Item, {through: "item_category"});

module.exports = {
    Item,
    Category
}