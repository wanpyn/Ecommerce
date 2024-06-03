const deleteService = require("../services/deleteSubCategory");

async function deleteSubCategory(req, res) {
  try {
    const { subCategoryId } = req.body;
    await deleteService.deleteSubCategory(subCategoryId);
    res.status(200).json({ message: "Sub Category Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { deleteSubCategory };
