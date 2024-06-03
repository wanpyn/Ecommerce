const addOrderService = require("../services/addOrder");

async function addOrder(req, res) {
  try {
    const orderData = req.body;
    const order = await addOrderService.addOrder(orderData);
    res
      .status(200)
      .json({ success: true, message: "Order added successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { addOrder };
