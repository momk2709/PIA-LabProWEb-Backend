const {
  successResponse,
  noContentResponse,
} = require("../../handlers/responseHandlers");
const {
  getAllCourses,
  createCourse,
  editCourse,
  deleteCourse,
} = require("./courses.services");

const getAllCoursesController = async (req, res, next) => {
  try {
    const courses = await getAllCourses();

    return successResponse({ courses }, "All courses")(res);
  } catch (error) {
    next(error);
  }
};

const createCourseController = async (req, res, next) => {
  try {
    const course = await createCourse(req.body);

    return successResponse({ course }, "Course created")(res);
  } catch (error) {
    next(error);
  }
};
const updateCourseController = async (req, res, next) => {
  try {
    const course = await editCourse(Number(req.params.id), req.body);

    return successResponse({ course }, "Course updated")(res);
  } catch (error) {
    next(error);
  }
};
const deleteCourseController = async (req, res, next) => {
  try {
    await deleteCourse(Number(req.params.id));

    return noContentResponse("Course deleted")(res);
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
