const express = require("express");
const cors = require("cors");
const categoryController = require("../controllers/editCategory");

const router = express.Router();

router.use(cors());

router.post("/edit-category", categoryController.editCategory);

module.exports = router;
