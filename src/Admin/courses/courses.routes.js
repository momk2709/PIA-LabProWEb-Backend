const {
  getAllCoursesController,
  updateCourseController,
  createCourseController,
  deleteCourseController,
} = require("./courses.controller");

const express = require("express");
const {
  createBodyValidator,
  paramIdValidator,
  updateBodyValidator,
} = require("./courses.validator");

const router = express.Router();

router.get("/course", getAllCoursesController);
router.post("/course", createBodyValidator, createCourseController);
router.put(
  "/course/:id",
  paramIdValidator,
  updateBodyValidator,
  updateCourseController
);
router.delete("/course/:id", paramIdValidator, deleteCourseController);

module.exports = router;
