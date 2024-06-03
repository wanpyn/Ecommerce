const express = require("express");

const deleteController = require("../controllers/deleteCategory");

const router = express.Router();

router.post("/delete-category", deleteController.deleteCategory);

module.exports = router;
