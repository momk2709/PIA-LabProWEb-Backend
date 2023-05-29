const { successResponse } = require("../../handlers/responseHandlers");
const { getAllCourses } = require("./course.handler");

const getAllCoursesController = async (req, res, next) => {
  try {
    const course = await getAllCourses();
    return successResponse(course, "Cursos obtenidos")(res);
  } catch (error) {
    next(error);
  }
};
const createCourseController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const updateCourseController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const deleteCourseController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
};
