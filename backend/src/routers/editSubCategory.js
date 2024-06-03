const express = require("express");
const cors = require("cors");
const subCategoryController = require("../controllers/editSubCategory");

const router = express.Router();

router.use(cors());

router.post("/edit-subcategory", subCategoryController.editSubCategory);

module.exports = router;
