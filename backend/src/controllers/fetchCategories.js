const categoryService = require("../services/fetchCategories");

async function fetchCategories(req, res) {
  try {
    const categories = await categoryService.fetchCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

module.exports = { fetchCategories };
