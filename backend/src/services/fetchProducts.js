const Product = require("../models/product");

async function fetchProducts() {
  const products = await Product.find({});
  return products;
}

module.exports = { fetchProducts };
