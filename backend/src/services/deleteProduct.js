const Product = require("../models/product");

async function deleteProduct(productId) {
  console.log("product id: ", productId);
  if (!productId) {
    throw new Error("Product Id not found");
  }

  const paperFound = await Product.findById(productId);

  if (!paperFound) {
    throw new Error("Product not found");
  }

  const deletedPaper = await Product.findByIdAndDelete(productId);

  return deletedPaper;
}

module.exports = { deleteProduct };
