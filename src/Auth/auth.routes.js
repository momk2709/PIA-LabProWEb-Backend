const express = require("express");
const router = express.Router();
const checkJWT = require("../middlewares/session.middleware");
const {
  registerController,
  loginController,
  meController,
} = require("./auth.controller");
const { registerValidator, loginValidator } = require("./auth.middleware");

router.post("/register", registerValidator, registerController);
router.post("/login", loginValidator, loginController);
router.get("/me", checkJWT, meController);

module.exports = router;
