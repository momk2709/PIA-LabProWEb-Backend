const express = require("express");
const router = express.Router();
const { registerController, loginController } = require("./auth.controller");
const { registerValidator, loginValidator } = require("./auth.middleware");

router.post("/register", registerValidator, registerController);
router.post("/login", loginValidator, loginController);

module.exports = router;
