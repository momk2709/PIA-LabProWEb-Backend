const express = require("express");
const router = express.Router();

router.use("/asignacion", require("./curso-category.routes"));
router.use("/asignacion", require("./curso-instructor.routes"));

module.exports = router;
