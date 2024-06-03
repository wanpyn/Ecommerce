const addCategoryService = require("../services/addCategory");

async function addCategory(req, res) {
  try {
    const categoryData = req.body;
    const category = await addCategoryService.addCategory(categoryData);
    res
      .status(200)
      .json({ success: true, message: "Category added successfully", category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { addCategory };
