const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  productName: Sequelize.STRING,
  productImageUrl: Sequelize.STRING,
  price: { type: Sequelize.DECIMAL, defaultValue: 0 },
  weight: Sequelize.DECIMAL,
  length: Sequelize.DECIMAL,
  width: Sequelize.DECIMAL,
  depth: Sequelize.DECIMAL,
  topSpeed: Sequelize.DECIMAL,
  acceleration: Sequelize.DECIMAL,
  class: Sequelize.STRING,
  productDescription: Sequelize.TEXT
});

module.exports = Product;
