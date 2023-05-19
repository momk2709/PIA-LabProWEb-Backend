const {
  createInstructor,
  getAllInstructor,
  getInstructorDetail,
  updateInstructor,
  deleteInstructor,
  addInstructorCourse,
} = require("./instructor.services");
const {
  successResponse,
  noContentResponse,
  createdResponse,
} = require("../handlers/responseHandlers");
const createInstructorController = async (req, res, next) => {
  try {
    const instructor = await createInstructor(req.body);
    return createdResponse({ instructor })(res);
  } catch (error) {
    next(error);
  }
};
const getAllInstructorsController = async (req, res, next) => {
  try {
    const instructores = await getAllInstructor(
      parseInt(req.params.instructorId)
    );
    return successResponse({ instructores })(res);
  } catch (error) {
    next(error);
  }
};
const getInstructorDetailController = async (req, res, next) => {
  try {
    const instructor = await getInstructorDetail(
      parseInt(req.params.instructorId)
    );
    return successResponse({ instructor })(res);
  } catch (error) {
    next(error);
  }
};
const updateInstructorController = async (req, res, next) => {
  try {
    const instructoUpdate = await updateInstructor(
      req.body,
      parseInt(req.params.instructorId)
    );
    return successResponse({ instructoUpdate })(res);
  } catch (error) {
    next(error);
  }
};
const deleteInstructorController = async (req, res, next) => {
  try {
    await deleteInstructor(parseInt(req.params.instructorId));
    return noContentResponse("Instructor eliminada con exito!")(res);
  } catch (error) {
    next(error);
  }
};
const addInstructorToCourseController = async (req, res, next) => {
  try {
    const asignarInstructorCurso = await addInstructorCourse(
      Number(req.body.instructorId),
      Number(req.body.cursoId)
    );
    return createdResponse({ asignarInstructorCurso })(res);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createInstructorController,
  getAllInstructorsController,
  getInstructorDetailController,
  updateInstructorController,
  deleteInstructorController,
  addInstructorToCourseController,
};
