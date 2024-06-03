const express = require("express");

const deleteController = require("../controllers/deleteUser");

const router = express.Router();

router.post("/delete-user", deleteController.deleteUser);

module.exports = router;
