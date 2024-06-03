const deleteService = require("../services/deleteDiscountCode");

async function deleteDiscountCode(req, res) {
  try {
    const { discountCodeId } = req.body;
    await deleteService.deleteDiscountCode(discountCodeId);
    res.status(200).json({ message: "Discount Code deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { deleteDiscountCode };
