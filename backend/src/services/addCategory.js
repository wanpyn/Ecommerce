const Category = require("../models/category");

async function addCategory(categoryData) {
  const { name, description } = categoryData;

  // Check if customer exists
  const categoryExist = await Category.findOne({ name });
  if (categoryExist) {
    throw new Error("Category name already exist");
  }

  // Create the new order
  const newCategory = new Category({
    name,
    description,
  });

  // Save the new order to the database
  const savedCategory = await newCategory.save();
  return savedCategory;
}

module.exports = { addCategory };
