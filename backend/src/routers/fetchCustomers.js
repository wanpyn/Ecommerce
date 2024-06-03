const express = require("express");
const cors = require("cors");
const customerController = require("../controllers/fetchCustomers");

const router = express.Router();

router.use(cors());

router.get("/customers", customerController.fetchCustomers);

module.exports = router;
