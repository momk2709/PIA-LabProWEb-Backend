const express = require("express");
const contactUsController = require("./informe.controller");
const router = express.Router();

router.post("/", contactUsController);

module.exports = router;
