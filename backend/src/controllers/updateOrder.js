const orderService = require("../services/updateOrder");

async function updateOrder(req, res) {
  try {
    const orderData = req.body;
    const order = await orderService.updateOrder(orderData);
    res.status(200).json({ message: "Product updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = { updateOrder };
