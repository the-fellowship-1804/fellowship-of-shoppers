const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  price: { type: Sequelize.DECIMAL, defaultValue: 0 },
  weight: Sequelize.DECIMAL,
  length: Sequelize.DECIMAL,
  width: Sequelize.DECIMAL,
  depth: Sequelize.DECIMAL,
  diameter: Sequelize.DECIMAL,
  topSpeed: Sequelize.DECIMAL,
  acceleration: Sequelize.DECIMAL,
  class: Sequelize.STRING,
  crew: Sequelize.INTEGER,
  firepower: Sequelize.INTEGER,
  description: Sequelize.TEXT
});

module.exports = Product;
