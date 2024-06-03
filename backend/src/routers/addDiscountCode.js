const express = require("express");

const discountCodeController = require("../controllers/addDiscountCode");

const router = express.Router();

router.post("/add-discount-code", discountCodeController.addDiscountCode);

module.exports = router;
