const express = require("express");
const cors = require("cors");
const materialController = require("../controllers/fetchMaterial");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.use(cors());

router.post(
  "/materials",
  // authMiddleware.authenticationToken,
  materialController.fetchMaterial
);

module.exports = router;
