const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");

const Customization = db.define("customization", {
  customizationName: Sequelize.STRING,
  //seller = user?
  customizationImageUrl: Sequelize.STRING,
  //engine a product?
  paintColor: Sequelize.STRING,
  hyperdrive: Sequelize.BOOLEAN,
  price: Sequelize.DECIMAL
  //computer??
  //robots??
  //crew??
});

module.exports = Customization;
