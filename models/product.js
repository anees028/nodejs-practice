const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

//Defining the model for database
const Product = sequelize.define('product', {
  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  description:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
});



module.exports = Product;

