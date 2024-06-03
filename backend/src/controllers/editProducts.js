const productService = require("../services/editProduct");

async function editProducts(req, res) {
  try {
    const productData = req.body;
    const product = await productService.editProducts(productData);
    res.status(200).json({ message: "Product edited successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

module.exports = { editProducts };
