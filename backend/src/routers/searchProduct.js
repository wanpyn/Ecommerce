const express = require("express");
const cors = require("cors");
const productsController = require("../controllers/searchProducts");

const router = express.Router();

router.use(cors());

router.get("/search-products", productsController.searchProducts);

module.exports = router;
