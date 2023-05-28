const express = require("express");
const router = express.Router();
const checkJWT = require("../middlewares/session.middleware");
const {
  getUsuarioController,
  getFacturaController,
} = require("./instructor.controller");

router.get("/", checkJWT, getUsuarioController);
router.get("/factura", getFacturaController);

module.exports = router;
