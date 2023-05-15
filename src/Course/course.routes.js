const express = require("express");
const router = express.Router();
const { createValidator, getDetailValidator } = require("./course.middleware");
const {
  getGenresController,
  getGenreIdController,
  getCourseIdController,
  postCourseController,
} = require("./course.controller");

router.get("/genres", getGenresController);
router.get("/genres/:genreId", getGenreIdController);
router.get("/:courseId", getDetailValidator, getCourseIdController);
router.post("/", createValidator, postCourseController);

module.exports = router;
