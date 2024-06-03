const express = require("express");
const cors = require("cors");
const orderController = require("../controllers/updateOrder");

const router = express.Router();

router.use(cors());

router.post("/update-order", orderController.updateOrder);

module.exports = router;
