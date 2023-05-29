const express = require("express");
const router = express.Router();

router.use("/asignacion", require("./curso-category.routes"));

module.exports = router;
