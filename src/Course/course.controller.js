const {
  createCourse,
  getCourseDetail,
  getCoursesByGenre,
  getGenres,
  getAllCourses,
  updateCourse,
  deleteCourse,
} = require("./course.services");
const {
  successResponse,
  createdResponse,
  noContentResponse,
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
    return successResponse(curso)(res);
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
const getAllCoursesController = async (req, res, next) => {
  try {
    const cursos = await getAllCourses();
    return successResponse({ cursos })(res);
  } catch (error) {
    next(error);
  }
};
const updateCourseController = async (req, res, next) => {
  try {
    const curso = await updateCourse(req.body, Number(req.params.courseId));
    return successResponse({ curso })(res);
  } catch (error) {
    next(error);
  }
};
const deleteCourseController = async (req, res, next) => {
  try {
    await deleteCourse(parseInt(req.params.courseId));
    return noContentResponse("Curso eliminado con exito")(res);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getGenresController,
  getCoursesByGenreController,
  getCourseIdController,
  postCourseController,
  getAllCoursesController,
  updateCourseController,
  deleteCourseController,
};
