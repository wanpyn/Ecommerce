const discountCode = require("../models/discountCode");

async function fetchDiscountCode() {
  const discountCodes = await discountCode.find({});
  return discountCodes;
}

module.exports = { fetchDiscountCode };
