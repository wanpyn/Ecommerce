const express = require("express");

const categoryController = require("../controllers/addCategory");

const router = express.Router();

router.post("/add-category", categoryController.addCategory);

module.exports = router;
