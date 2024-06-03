const categoryService = require("../services/editCategory");

async function editCategory(req, res) {
  try {
    const { id, name, description } = req.body;
    const category = await categoryService.editCategory(id, name, description);
    res.status(200).json({ message: "Category edited successfully", category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { editCategory };
