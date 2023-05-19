const express = require("express");
const {
  createValidator,
  getDetailValidator,
  getCoursesByGenreValidator,
} = require("./course.middleware");
const {
  getGenresController,
  getCoursesByGenreController,
  getCourseIdController,
  postCourseController,
  getAllCoursesController,
  updateCourseController,
  deleteCourseController,
} = require("./course.controller");
const router = express.Router();

router.get("/genres", getGenresController);
router.get(
  "/genres/:genreId",
  getCoursesByGenreValidator,
  getCoursesByGenreController
);
router.get("/:courseId", getDetailValidator, getCourseIdController);
router.post("/", createValidator, postCourseController);
router.get("/", getAllCoursesController);
router.put(
  "/:courseId",
  getDetailValidator,
  createValidator,
  updateCourseController
);
router.delete("/:courseId", getDetailValidator, deleteCourseController);

module.exports = router;
