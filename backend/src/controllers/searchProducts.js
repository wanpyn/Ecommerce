const productService = require("../services/searchProducts");

async function searchProducts(req, res) {
  try {
    const { query } = req.body;
    const product = await productService.searchProducts(query);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

module.exports = { searchProducts };
