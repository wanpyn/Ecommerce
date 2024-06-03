const subCategoryService = require("../services/editSubCategory");

async function editSubCategory(req, res) {
  try {
    const { id, name, description } = req.body;
    const subCategory = await subCategoryService.editSubCategory(
      id,
      name,
      description
    );
    res
      .status(200)
      .json({ message: "Sub Category edited successfully", subCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { editSubCategory };
