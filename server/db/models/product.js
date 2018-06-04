const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  productName: Sequelize.STRING,
  //seller = user?
  productImageUrl: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  weight: Sequelize.DECIMAL,
  height: Sequelize.DECIMAL,
  width: Sequelize.DECIMAL,
  depth: Sequelize.DECIMAL,
  topSpeed: Sequelize.DECIMAL,
  acceleration: Sequelize.DECIMAL,
  class: Sequelize.STRING
  //crew??
  //passengers??
});

module.exports = Product;
