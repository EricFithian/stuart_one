require("../config/db.connection");

module.exports = {
  // Our original product model
  Product: require("./Product"),
  // our new baby product model
  BbProduct: require("./BbProduct"),
  // Our final user model
  User: require('./User'),
};