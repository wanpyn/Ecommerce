const express = require("express");
const cors = require("cors");
const ordersController = require("../controllers/fetchOrders");

const router = express.Router();

router.use(cors());

router.get("/orders", ordersController.fetchOrders);

module.exports = router;
