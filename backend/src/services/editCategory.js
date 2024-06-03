const Category = require("../models/category");

async function editCategory(id, name, description) {
  try {
    const categoryFound = await Category.findById(id);
    if (!categoryFound) {
      throw new Error("Category not found");
    }

    categoryFound.name = name || categoryFound.name;
    categoryFound.description = description || categoryFound.description;
    categoryFound.save();

    return categoryFound;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error: ${error.message}`);
  }
}

module.exports = { editCategory };
