const express = require("express");
const router = express.Router();

router.use("/asignacion", require("./curso-category.routes"));
router.use("/asignacion", require("./curso-instructor.routes"));
router.use("/asignacion", require("./curso-user.routes"));

module.exports = router;
