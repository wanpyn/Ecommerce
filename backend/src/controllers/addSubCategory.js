const addSubCategoryService = require("../services/addSubCategory");

async function addSubCategory(req, res) {
  try {
    const subCategoryData = req.body;
    const subCategory = await addSubCategoryService.addSubCategory(subCategoryData);
    res
      .status(200)
      .json({
        success: true,
        message: "Sub Category added successfully",
        subCategory,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { addSubCategory };
