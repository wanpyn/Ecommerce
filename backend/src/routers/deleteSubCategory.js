const express = require("express");

const deleteController = require("../controllers/deleteSubCategory");

const router = express.Router();

router.post("/delete-subcategory", deleteController.deleteSubCategory);

module.exports = router;
