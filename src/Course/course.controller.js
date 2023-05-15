const { createCourse, getCourseDetail } = require("./course.services");
const getGenresController = async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
const getGenreIdController = async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
const getCourseIdController = async (req, res) => {
  try {
    const curso = await getCourseDetail(parseInt(req.params.courseId));
    res.send(curso);
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
};
const postCourseController = async (req, res) => {
  try {
    const course = await createCourse(req.body);
    res.send(course);
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
};
module.exports = {
  getGenresController,
  getGenreIdController,
  getCourseIdController,
  postCourseController,
};
