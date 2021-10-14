const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, "Inputting a name is required."]
  },
  image: {
      type: String,
      required: [true, "Inputting an image is required."]
  },
  price: {
      type: Number,
      required: [true, "Inputting a price is required."]
  },
  description: {
      type: String,
      required: [true, "Inputting a description is required."]
  },
  category: {
      type: String,
      required: [true, "Inputting a category is required."]
  }

});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
