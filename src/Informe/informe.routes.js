const express = require("express");
const informeMiddleware = require("./informe.middleware");
const contactUsController = require("./informe.controller");
const router = express.Router();

router.post("/", informeMiddleware, contactUsController);

module.exports = router;
