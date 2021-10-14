require("../config/db.connection");

module.exports = {
    product: require("./product_controllers"),
    babyProduct: require("./bb_products"),
    user: require('./auth_controllers'),
};