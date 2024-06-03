const Product = require("../models/product");

async function searchProducts(query) {
  const product = await Product.findOne({ title: query });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
}

module.exports = { searchProducts };
