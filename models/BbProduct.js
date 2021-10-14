const mongoose = require("mongoose");

const BbProductSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, "This field is required."]
  },
  image: {
      type: String,
      required: [true, "This field is required."]
  },
  price: {
      type: Number,
      required: [true, "This field is required."]
  },
  description: {
      type: String,
      required: [true, "This field is required."]
  },
  category: {
      type: String,
      required: [true, "This field is required."]
  }

});

const BbProduct = mongoose.model("BbProduct", BbProductSchema);

module.exports = BbProduct;