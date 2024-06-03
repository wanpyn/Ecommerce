const SubCategory = require("../models/subCategory");

async function editSubCategory(id, name, description) {
  try {
    const subCategoryFound = await SubCategory.findById(id);
    if (!subCategoryFound) {
      throw new Error("Category not found");
    }

    subCategoryFound.name = name || subCategoryFound.name;
    subCategoryFound.description = description || subCategoryFound.description;
    subCategoryFound.save();

    return subCategoryFound;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error: ${error.message}`);
  }
}

module.exports = { editSubCategory };
