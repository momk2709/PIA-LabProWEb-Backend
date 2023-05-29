const express = require("express");
const router = express.Router();
const { getUserProfileController } = require("./usuario.controller");
const checkJWT = require("../middlewares/session.middleware");

router.get("/profile", checkJWT, getUserProfileController);

module.exports = router;
