const express = require("express");

const deleteController = require("../controllers/deleteProduct");

const router = express.Router();

router.post("/delete-product", deleteController.deleteProduct);

module.exports = router;
