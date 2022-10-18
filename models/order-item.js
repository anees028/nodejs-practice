const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

//Defining the model with a name of of your table...
const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER
    
})

module.exports = OrderItem;

