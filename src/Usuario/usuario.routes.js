const express = require("express");
const router = express.Router();
const {
  getUserProfileController,
  getUserfacturaController,
  editUserFacturaController,
} = require("./usuario.controller");
const checkJWT = require("../middlewares/session.middleware");
const { paramValidation, updateValidation } = require("./usuario.validator");

router.get("/profile", checkJWT, getUserProfileController);
router.get(
  "/profile/factura/:id",
  checkJWT,
  paramValidation,
  getUserfacturaController
);
router.put(
  "/profile/factura/:id",
  checkJWT,
  paramValidation,
  updateValidation,
  editUserFacturaController
);

module.exports = router;
