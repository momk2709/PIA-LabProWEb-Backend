const express = require("express");
const { paramValidation, bodyValidation } = require("./facturas.validator");
const {
  getAllFacturasController,
  updateFacturaController,
} = require("./facturas.controller");
const router = express.Router();
router.get("/factura", getAllFacturasController);
router.put(
  "/factura/:id",
  paramValidation,
  bodyValidation,
  updateFacturaController
);

module.exports = router;
