const subCategoryService = require("../services/fetchSubCategories");

async function fetchSubCategories(req, res) {
  try {
    const subCategories = await subCategoryService.fetchSubCategories();
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

module.exports = { fetchSubCategories };
