const order = require("../models/order");

async function fetchOrders() {
  const orders = await order.find({});
  return orders;
}

module.exports = { fetchOrders };
