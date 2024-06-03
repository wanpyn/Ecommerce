const discountCodeService = require("../services/addDiscountCode");

async function addDiscountCode(req, res) {
  try {
    const discountCodeData = req.body;
    const discountCode = await discountCodeService.addDiscountCode(
      discountCodeData
    );
    res.status(200).json({
      success: true,
      message: "Discount code added successfully",
      discountCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { addDiscountCode };
