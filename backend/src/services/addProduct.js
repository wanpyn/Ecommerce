const Product = require("../models/product");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");

async function upload(uploadData, fileName) {
  const {
    title,
    description,
    manufacturingPrice,
    sellingPrice,
    discountingPrice,
    categoryId,
    category,
    subCategoryId,
    subCategory,
    totalStock,
    sku,
    brand,
  } = uploadData;

  // console.log(title);
  // console.log(description);
  // console.log(price);
  // console.log(categoryId);
  // console.log(category);
  // console.log(subCategoryId);
  // console.log(subCategory);
  // console.log(totalStock);
  // console.log(sku);
  // console.log(brand);
  // console.log(fileName);

  if (!fileName) {
    throw new Error("File not found");
  }

  // Check if category exists
  const categoryExist = await Category.findById(categoryId);
  if (!categoryExist) {
    throw new Error("Category does not exist");
  }

  // Check if sub-category exists
  const subCategoryExist = await SubCategory.findById(subCategoryId);
  if (!subCategoryExist) {
    throw new Error("Sub Category does not exist");
  }

  const newProduct = new Product({
    title,
    description,
    manufacturingPrice,
    sellingPrice,
    discountingPrice,
    categoryId,
    category,
    subCategoryId,
    subCategory,
    totalStock,
    availableStock: totalStock,
    sku,
    brand,
    image: fileName,
  });

  const savedMaterial = await newProduct.save();
  return savedMaterial;
}

module.exports = { upload };
