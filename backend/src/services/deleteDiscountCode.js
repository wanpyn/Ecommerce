const DiscountCode = require("../models/discountCode");

async function deleteDiscountCode(discountCodeId) {
  try {
    if (!discountCodeId) {
      throw new Error("Discount code Id not found");
    }

    const deletedDiscountCode = await DiscountCode.findByIdAndDelete(
      discountCodeId
    );

    if (!deletedDiscountCode) {
      throw new Error("Discount code not found");
    }

    return deletedDiscountCode;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Error: ${error.message}`);
  }
}

module.exports = { deleteDiscountCode };
