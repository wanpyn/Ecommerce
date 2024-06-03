const deleteService = require("../services/deleteCategory");

async function deleteCategory(req, res) {
  try {
    const { categoryId } = req.body;
    await deleteService.deleteCategory(categoryId);
    res.status(200).json({ message: "Category Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { deleteCategory };
