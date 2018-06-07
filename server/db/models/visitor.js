const Sequelize = require('sequelize');
const db = require('../db');

const Visitor = db.define('visitor', {
  sessionid: {
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  address: Sequelize.STRING,
  paymentInfo: {
    type: Sequelize.JSON,
    //I don't know well this will work, but mimicking the method the boilerplate uses for pw and salt
    get() {
      return () => this.getDataValue('paymentInfo');
    }
  },
  cart: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
  }
});

module.exports = Visitor;
