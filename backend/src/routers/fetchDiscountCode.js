const express = require("express");
const cors = require("cors");
const discountCodeController = require("../controllers/fetchDiscountCode");

const router = express.Router();

router.use(cors());

router.get("/discount-codes", discountCodeController.fetchDiscountCode);

module.exports = router;
