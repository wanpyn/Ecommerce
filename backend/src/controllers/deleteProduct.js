const deleteService = require("../services/deleteProduct");

async function deleteProduct(req, res) {
  try {
    const { productId } = req.body;
    const product = await deleteService.deleteProduct(productId);
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { deleteProduct };
