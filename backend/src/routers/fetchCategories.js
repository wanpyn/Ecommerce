const express = require("express");
const cors = require("cors");
const categoryController = require("../controllers/fetchCategories");

const router = express.Router();

router.use(cors());

router.get("/categories", categoryController.fetchCategories);

module.exports = router;
