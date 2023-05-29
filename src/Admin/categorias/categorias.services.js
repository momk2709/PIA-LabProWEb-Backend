const express = require("express");
const router = express.Router();

router.get("/categoria");
router.post("/categoria");
router.put("/categoria/:id");
router.delete("/categoria/:id");

module.exports = router;
