const express = require("express");
const router = express.Router();
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
} = require("./course.controller");

router.get("/genres", getGenresController);
router.get(
  "/genres/:genreId",
  getCoursesByGenreValidator,
  getCoursesByGenreController
);
router.get("/:courseId", getDetailValidator, getCourseIdController);
router.post("/", createValidator, postCourseController);

module.exports = router;
