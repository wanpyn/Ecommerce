const Category = require("../models/category");
const SubCategory = require("../models/subCategory");

async function addSubCategory(categoryData) {
  const { name, category, description } = categoryData;

  // Check if customer exists
  const subCategoryExist = await SubCategory.findOne({ name });
  if (subCategoryExist) {
    throw new Error("Sub Category name already exist");
  }

  const categoryExist = await Category.findById(category);
  if (!categoryExist) {
    throw new Error("Category does not exist");
  }

  // Create the new order
  const newSubCategory = new SubCategory({
    name,
    category,
    description,
  });

  // Save the new order to the database
  const savedCategory = await newSubCategory.save();
  return savedCategory;
}

module.exports = { addSubCategory };
