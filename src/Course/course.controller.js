const {
  createCourse,
  getCourseDetail,
  getCoursesByGenre,
  getGenres,
} = require("./course.services");
const {
  successResponse,
  createdResponse,
} = require("../handlers/responseHandlers");

const getGenresController = async (req, res, next) => {
  try {
    const categorias = await getGenres();
    return successResponse({ categorias })(res);
  } catch (error) {
    next(error);
  }
};
const getCoursesByGenreController = async (req, res, next) => {
  try {
    const cursos = await getCoursesByGenre(parseInt(req.params.genreId));
    return successResponse({ cursos })(res);
  } catch (error) {
    next(error);
  }
};
const getCourseIdController = async (req, res, next) => {
  try {
    const curso = await getCourseDetail(parseInt(req.params.courseId));
    return successResponse({ curso })(res);
  } catch (error) {
    next(error);
  }
};
const postCourseController = async (req, res, next) => {
  try {
    const curso = await createCourse(req.body);
    return createdResponse({ curso })(res);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getGenresController,
  getCoursesByGenreController,
  getCourseIdController,
  postCourseController,
};
