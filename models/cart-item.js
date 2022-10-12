const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

//Defining the model with a name of of your table...
const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER
    
})

module.exports = CartItem;

