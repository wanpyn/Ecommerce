const orderService = require("../services/fetchOrders");

async function fetchOrders(req, res) {
  try {
    const orders = await orderService.fetchOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
}

module.exports = { fetchOrders };
