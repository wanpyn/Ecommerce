const order = require("../models/order");

async function updateOrder(orderData) {
  const {
    id,
    customer,
    products,
    totalAmount,
    paymentMethod,
    paymentStatus,
    shippingAddress,
    orderStatus,
    orderDate,
    deliveryDate,
  } = orderData;

  const existingOrder = await order.findById(id);
  if (!existingOrder) {
    throw new Error("Order not found");
  }

  existingOrder.customer = customer || existingOrder.customer;
  existingOrder.products = products || existingOrder.products;
  existingOrder.totalAmount = totalAmount || existingOrder.totalAmount;
  existingOrder.paymentMethod = paymentMethod || existingOrder.paymentMethod;
  existingOrder.paymentStatus = paymentStatus || existingOrder.paymentStatus;
  existingOrder.shippingAddress = shippingAddress || existingOrder.shippingAddress;
  existingOrder.orderStatus = orderStatus || existingOrder.orderStatus;
  existingOrder.orderDate = orderDate || existingOrder.orderDate;
  existingOrder.deliveryDate = deliveryDate || existingOrder.deliveryDate;
  existingOrder.save();

  return existingOrder;
}

module.exports = { updateOrder };
