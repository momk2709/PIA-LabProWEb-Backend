const express = require("express");
const router = express.Router();
const {
  getGenresController,
  getGenreIdController,
  getCourseIdController,
} = require("./course.controller");

router.get("/genres", getGenresController);
router.get("/genres/:genreId", getGenreIdController);
router.get("/:courseId", getCourseIdController);
router.post("")

module.exports = router;
