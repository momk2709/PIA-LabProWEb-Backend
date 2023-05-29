const { isAdmin } = require("./admin.middleware");
const checkJWT = require("../middlewares/session.middleware");
const express = require("express");
const router = express.Router();

router.use(checkJWT);
router.use(isAdmin);

router.use("/", require("./courses"));
router.use("/", require("./instructors"));
router.use("/", require("./users"));
router.use("/", require("./categorias"));
module.exports = router;
