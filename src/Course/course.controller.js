const {
  createCourse,
  getCourseDetail,
  getCoursesByGenre,
  getGenres,
} = require("./course.services");

const getGenresController = async (req, res) => {
  try {
    const categorias = await getGenres();
    res.send(categorias);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
const getCoursesByGenreController = async (req, res) => {
  try {
    const cursos = await getCoursesByGenre(parseInt(req.params.genreId));
    res.send(cursos);
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
  getCoursesByGenreController,
  getCourseIdController,
  postCourseController,
};
