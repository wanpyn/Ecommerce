const express = require("express");

const addOrderController = require("../controllers/addOrder");

const router = express.Router();

router.post("/add-order", addOrderController.addOrder);

module.exports = router;
