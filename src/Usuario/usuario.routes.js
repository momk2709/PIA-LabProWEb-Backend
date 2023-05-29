const express = require("express");
const router = express.Router();
const checkJWT = require("../middlewares/session.middleware");
const {
  getUserController,
  getUserFacturaController,
  getUserCourseController,
} = require("./usuario.controller");

router.get("/", checkJWT, getUserController);
router.get("/factura", checkJWT, getUserFacturaController);
router.get("/course", checkJWT, getUserCourseController);

module.exports = router;
