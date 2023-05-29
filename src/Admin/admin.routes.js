const checkJWT = require("../middlewares/session.middleware");
const express = require("express");
const router = express.Router();
const { isAdmin } = require("./admin.middleware");

router.use(checkJWT);
router.use(isAdmin);

router.use("/", require("./instructor"));
router.use("/", require("./course"));
router.use("/", require("./users"));

module.exports = router;
