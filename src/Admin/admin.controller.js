const { successResponse } = require("../handlers/responseHandlers");
const { getAllInstructor, getAllCourses, getAllUsers } = require("./handlers");

const getAllInstructorController = async (req, res, next) => {
  try {
    const instructor = await getAllInstructor();
    return successResponse(instructor, "Instructores obtenidos")(res);
  } catch (error) {
    next(error);
  }
};

const getAllCoursesController = async (req, res, next) => {
  try {
    const course = await getAllCourses();
    return successResponse(course, "Cursos obtenidos")(res);
  } catch (error) {
    next(error);
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return successResponse(users, "Usuarios obtenidos")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInstructorController,
  getAllCoursesController,
  getAllUsersController,
};
