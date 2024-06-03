const express = require("express");
const cors = require("cors");
const paperController = require("../controllers/fetchPaper");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.use(cors());

router.post(
  "/questionpapers",
  // authMiddleware.authenticationToken,
  paperController.fetchQuestionPaper
);

module.exports = router;
