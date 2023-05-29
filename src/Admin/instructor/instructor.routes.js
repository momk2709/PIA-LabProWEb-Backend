const express = require("express");
const router = express.Router();
const {
  getAllInstructorController,
  updateInstructorController,
  createInstructorController,
  deleteInstructorController,
} = require("./instructor.controller");
const {
  createInstructorValidator,
  updateInstructorValidator,
  paramValidator,
} = require("./instructor.validator");

router.get("/instructor", getAllInstructorController);
router.post("/instructor", createInstructorController);
router.put(
  "/instructor/:id",
  updateInstructorValidator,
  updateInstructorController
);
router.delete("/instructor/:id", deleteInstructorController);

module.exports = router;
