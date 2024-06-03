const express = require("express");
const cors = require("cors");
const subCategoryController = require("../controllers/fetchSubCategories");

const router = express.Router();

router.use(cors());

router.get("/subcategories", subCategoryController.fetchSubCategories);

module.exports = router;
