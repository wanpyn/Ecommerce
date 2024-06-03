const SubCategory = require("../models/subCategory");

async function deleteSubCategory(subCategoryId) {
  try {
    if (!subCategoryId) {
      throw new Error("Sub Category Id not found");
    }

    const subCategoryFound = await SubCategory.findByIdAndDelete(subCategoryId);

    if (!subCategoryFound) {
      throw new Error("Sub Category not found");
    }

    return subCategoryFound;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error: ${error.message}`);
  }
}

module.exports = { deleteSubCategory };
