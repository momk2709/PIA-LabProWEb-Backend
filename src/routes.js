const express = require("express");
const router = express.Router();

router.use("/auth", require("./Auth"));
router.use("/informe", require("./Informe"));

module.exports = router;
