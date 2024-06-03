const Category = require("../models/category");

async function deleteCategory(categoryId) {
  try {
    if (!categoryId) {
      throw new Error("Category Id not found");
    }

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error: ${error.message}`);
  }
}

module.exports = { deleteCategory };
