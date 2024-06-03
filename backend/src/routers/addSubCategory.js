const express = require("express");

const categoryController = require("../controllers/addSubCategory");

const router = express.Router();

router.post("/add-subcategory", categoryController.addSubCategory);

module.exports = router;
