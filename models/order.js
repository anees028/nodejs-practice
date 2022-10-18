const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

//Defining the model with a name of of your table...
const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
    
})

module.exports = Order;

