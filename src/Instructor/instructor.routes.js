const express = require("express");
const {
  createInstructorValidator,
  getInstructorValidator,
} = require("./instructor.middleware");
const {
  createInstructorController,
  getAllInstructorsController,
  getInstructorDetailController,
  updateInstructorController,
  deleteInstructorController,
} = require("./instructor.controller");
const router = express.Router();

router.post("/", createInstructorValidator, createInstructorController);
router.get("/", getAllInstructorsController);
router.get(
  "/:instructorId",
  getInstructorValidator,
  getInstructorDetailController
);
router.put(
  "/:instructorId",
  getInstructorValidator,
  createInstructorValidator,
  updateInstructorController
);
router.delete(
  "/:instructorId",
  getInstructorValidator,
  deleteInstructorController
);

module.exports = router;
