const express = require("express");
const cors = require("cors");

const deleteController = require("../controllers/deleteMaterial");

const router = express.Router();

router.use(cors());

router.post("/delete-material", deleteController.deleteMaterial);

module.exports = router;
