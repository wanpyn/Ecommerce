const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const Sales = require("../models/sales");
const DiscountCode = require("../models/discountCode");
const { formatISO } = require("date-fns");
const { addMinutes } = require("date-fns");

async function addOrder(userData) {
  try {
    const { customer, products, discountCode, paymentMethod, shippingAddress } =
      userData;

    // Check if customer exists
    const customerExist = await User.findById(customer);
    if (!customerExist) {
      throw new Error("Customer does not exist");
    }

    // Calculate the total amount based on the product prices and quantities
    let totalAmount = 0;
    let discountAmount = 0;
    let discountValue = 0;
    let productExist = null;
    const productDetails = [];
    for (const item of products) {
      productExist = await Product.findById(item.product);
      if (!productExist) {
        throw new Error(`Product with ID ${item.product} does not exist`);
      }

      // Check if there's enough available stock
      if (productExist.availableStock < item.quantity) {
        throw new Error(`Not enough stock for product with ID ${item.product}`);
      }

      // Reduce the available stock
      productExist.availableStock -= item.quantity;
      totalAmount += productExist.discountingPrice * item.quantity;
      discountAmount += productExist.discountingPrice * item.quantity;
      productDetails.push({
        productID: item.product,
        quantitySold: item.quantity,
        manufacturingPrice: productExist.manufacturingPrice,
        sellingPrice: productExist.sellingPrice,
        discountingPrice: productExist.discountingPrice,
      });
    }

    // Get the current date and adjust to local timezone
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset(); // Get the timezone offset in minutes
    const orderDate = formatISO(addMinutes(now, -timezoneOffset)); // Adjust the date to the local timezone and format it

    // Calculate delivery date (current date plus 7 days)
    const deliveryDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Current date plus 7 days in milliseconds

    if (discountCode) {
      // Order with discount
      const validDiscountCode = await DiscountCode.findOne({
        code: discountCode,
        isActive: true,
      });
      if (!validDiscountCode) {
        throw new Error("Discount code not valid");
      }

      const now = new Date();
      if (validDiscountCode.expiryDate < now) {
        throw new Error("Discount code has expired");
      }

      if (
        validDiscountCode.usageLimit !== null &&
        validDiscountCode.usageLimit <= 0
      ) {
        throw new Error("Discount code usage limit reached");
      }

      // Calculate discount amount
      if (validDiscountCode.discountType === "percentage") {
        discountValue = (totalAmount * validDiscountCode.discountValue) / 100;
      } else if (validDiscountCode.discountType === "amount") {
        discountValue = validDiscountCode.discountValue;
      }

      // productDetails.forEach((item) => {
      //   item.discountingPrice =
      //     item.sellingPrice - discountAmount / products.length;
      // });

      // Deduct discountAmount from totalAmount
      discountAmount -= discountValue;

      // Update usage limit if applicable
      if (validDiscountCode.usageLimit !== null) {
        validDiscountCode.usageLimit -= 1;
        await validDiscountCode.save();
      }

      const newOrder = new Order({
        customer,
        products,
        totalAmount,
        discountCode,
        discountAmount,
        paymentMethod,
        paymentStatus: "Paid",
        shippingAddress,
        orderStatus: "Processing",
        orderDate,
        deliveryDate,
      });

      // Save the new order to the database
      const savedOrder = await newOrder.save();
      await productExist.save();

      // Save each product as a sale
      // for (const item of productDetails) {
      //   const newSale = new Sales({
      //     orderID: savedOrder._id,
      //     productIDs: [
      //       {
      //         productID: item.productID,
      //         quantitySold: item.quantitySold,
      //         manufacturingPrice: item.manufacturingPrice,
      //         sellingPrice: item.sellingPrice,
      //         discountingPrice: item.discountingPrice,
      //       },
      //     ],
      //     totalAmount: item.discountingPrice * item.quantitySold,
      //     discountCode,
      //     discountAmount,
      //   });

      //   await newSale.save();
      // }

      // Construct the productIDs array
      const productIDs = productDetails.map((item) => ({
        productID: item.productID,
        quantitySold: item.quantitySold,
        manufacturingPrice: item.manufacturingPrice,
        sellingPrice: item.sellingPrice,
        discountingPrice: item.discountingPrice,
      }));

      // Create the new sale with the productIDs array
      const newSale = new Sales({
        orderID: savedOrder._id,
        productIDs: productIDs,
        totalAmount: totalAmount,
        discountCode,
        discountAmount,
      });

      // Save the new sale to the database
      await newSale.save();

      return newOrder;
    } else {
      // Order without discount
      const newOrder = new Order({
        customer,
        products,
        totalAmount,
        paymentMethod,
        paymentStatus: "Paid",
        shippingAddress,
        orderStatus: "Processing",
        orderDate,
        deliveryDate,
      });

      // Save the new order to the database
      const savedOrder = await newOrder.save();
      await productExist.save();

      // Adding sales data
      // for (const item of productDetails) {
      //   const newSale = new Sales({
      //     orderID: savedOrder._id,
      //     productIDs: [
      //       {
      //         productID: item.productID,
      //         quantitySold: item.quantitySold,
      //         manufacturingPrice: item.manufacturingPrice,
      //         sellingPrice: item.sellingPrice,
      //         discountingPrice: item.discountingPrice,
      //       },
      //     ],
      //     totalAmount: item.discountingPrice * item.quantitySold,
      //   });

      //   await newSale.save();
      // }

      // Construct the productIDs array
      const productIDs = productDetails.map((item) => ({
        productID: item.productID,
        quantitySold: item.quantitySold,
        manufacturingPrice: item.manufacturingPrice,
        sellingPrice: item.sellingPrice,
        discountingPrice: item.discountingPrice,
      }));

      // Create the new sale with the productIDs array
      const newSale = new Sales({
        orderID: savedOrder._id,
        productIDs: productIDs,
        totalAmount: totalAmount, // Use the totalAmount calculated earlier
      });

      // Save the new sale to the database
      await newSale.save();

      console.log("product details: ", productDetails);

      return savedOrder;
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error: ${error.message}`);
  }
}

module.exports = { addOrder };
