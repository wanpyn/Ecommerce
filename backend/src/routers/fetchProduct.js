const express = require("express");
const cors = require("cors");
const productsController = require("../controllers/fetchProducts");

const router = express.Router();

router.use(cors());

router.get("/products", productsController.fetchProducts);

module.exports = router;
