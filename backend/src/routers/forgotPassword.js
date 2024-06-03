const express = require("express");
const cors = require("cors");
const { forgotPassword } = require("../controllers/forgotPassword");

const router = express.Router();

router.use(cors());

router.post("/forgot-password", forgotPassword);

module.exports = router;
