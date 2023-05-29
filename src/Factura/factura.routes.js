const express = require("express");
const router = express.Router();
const { postFacturaController } = require("./factura.controller");

router.post("/", postFacturaController);
router.get("/");

module.exports = router;
