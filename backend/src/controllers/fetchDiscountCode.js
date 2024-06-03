const discountCodeService = require("../services/fetchDiscountCode");

async function fetchDiscountCode(req, res) {
  try {
    const discountCodes = await discountCodeService.fetchDiscountCode();
    res.json(discountCodes);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { fetchDiscountCode };
