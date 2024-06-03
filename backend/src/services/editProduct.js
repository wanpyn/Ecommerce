const Product = require("../models/product");

async function editProducts(productData) {
  const {
    id,
    title,
    description,
    price,
    category,
    subCategory,
    stock,
    sku,
    brand,
  } = productData;

  const productFound = await Product.findById(id);
  if (!productFound) {
    throw new Error("User not found");
  }

  productFound.title = title || productFound.title;
  productFound.description = description || productFound.description;
  productFound.price = price || productFound.price;
  productFound.category = category || productFound.category;
  productFound.subCategory = subCategory || productFound.subCategory;
  productFound.stock = stock || productFound.stock;
  productFound.sku = sku || productFound.sku;
  productFound.brand = brand || productFound.brand;
  productFound.save();

  return productFound;
}

module.exports = { editProducts };
