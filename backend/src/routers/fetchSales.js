const express = require("express");
const cors = require("cors");
const salesController = require("../controllers/fetchSales");

const router = express.Router();

router.use(cors());

router.get("/sales", salesController.fetchSales);

module.exports = router;
