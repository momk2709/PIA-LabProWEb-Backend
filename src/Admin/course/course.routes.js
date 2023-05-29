const express = require("express");
const router = express.Router();
const {
  getAllCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
} = require("./course.controller");
const {
  createCourseValidator,
  updateCourseValidator,
  paramValidator,
} = require("./course.validator");

router.get("/course", getAllCoursesController);
router.post("/course", createCourseController);
router.put("/course/:id", updateCourseController);
router.delete("/course/:id", deleteCourseController);

module.exports = router;
