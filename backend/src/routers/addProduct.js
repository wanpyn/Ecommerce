const express = require("express");
const multer = require("multer");

const addProductController = require("../controllers/addProduct");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/add-product", upload.single("file"), addProductController.addProduct);

module.exports = router;
