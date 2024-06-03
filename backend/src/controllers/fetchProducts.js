const productService = require("../services/fetchProducts");

async function fetchProducts(req, res) {
  try {
    const products = await productService.fetchProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

module.exports = { fetchProducts };
