const express = require("express");

const deleteController = require("../controllers/deleteDiscountCode");

const router = express.Router();

router.post("/delete-discount-code", deleteController.deleteDiscountCode);

module.exports = router;
