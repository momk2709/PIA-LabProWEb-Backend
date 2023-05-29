const express = require("express");
const {
  instructorBodyValidator,
  paramValidator,
} = require("./instructores.validator");
const {
  getAllInstructorsController,
  createInstructorController,
  deleteInstructorController,
  updateInstructorController,
} = require("./instructors.controller");

const router = express.Router();

router.get("/instructor", getAllInstructorsController);

router.post("/instructor", instructorBodyValidator, createInstructorController);

router.put(
  "/instructor/:id",
  paramValidator,
  instructorBodyValidator,
  updateInstructorController
);

router.delete("/instructor/:id", paramValidator, deleteInstructorController);

module.exports = router;
