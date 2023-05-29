const express = require("express");
const router = express.Router();

router.use("/admin", require("./Admin"));
router.use("/auth", require("./Auth"));
router.use("/informe", require("./Informe"));
router.use("/course", require("./Course"));
router.use("/instructor", require("./Instructor"));
router.use("/user", require("./Usuario"));

module.exports = router;
