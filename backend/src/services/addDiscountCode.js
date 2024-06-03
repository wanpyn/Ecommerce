const DiscountCode = require("../models/discountCode");

async function addDiscountCode(discountCodeData) {
  const {
    code,
    description,
    discountType,
    discountValue,
    expiryDate,
    usageLimit,
  } = discountCodeData;

  // Check if customer exists
  const categoryExist = await DiscountCode.findOne({ code });
  if (categoryExist) {
    throw new Error("Discount code already exist");
  }

  // if (!categoryExist.canBeUsed()) {
  //   throw new Error("Discount code cannot be used");
  // }

  // Create the new
  const newDiscount = new DiscountCode({
    code,
    description,
    discountType,
    discountValue,
    expiryDate,
    usageLimit,
  });

  // Save the new order to the database
  const savedDiscountCode = await newDiscount.save();
  return savedDiscountCode;
}

module.exports = { addDiscountCode };
