const express = require("express");
const {
  createInstructorValidator,
  getInstructorValidator,
  instructorCourseValidator,
} = require("./instructor.middleware");
const {
  createInstructorController,
  getAllInstructorsController,
  getInstructorDetailController,
  updateInstructorController,
  deleteInstructorController,
  addInstructorToCourseController,
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
router.post(
  "/curso",
  instructorCourseValidator,
  addInstructorToCourseController
);

module.exports = router;
