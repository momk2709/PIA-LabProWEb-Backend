const { successResponse } = require("../../handlers/responseHandlers");
const {
  getAllInstructors,
  createInstructor,
  deleteInstructor,
  editInstructor,
} = require("./instructores.services");

const getAllInstructorsController = async (req, res, next) => {
  try {
    const instructores = await getAllInstructors();

    return successResponse({ instructores }, "All instructors")(res);
  } catch (error) {
    next(error);
  }
};

const createInstructorController = async (req, res, next) => {
  try {
    const instructor = await createInstructor(req.body);

    return successResponse({ instructor }, "Instructor created")(res);
  } catch (error) {
    next(error);
  }
};

const updateInstructorController = async (req, res, next) => {
  try {
    const instructor = await editInstructor(Number(req.params.id), req.body);

    return successResponse({ instructor }, "Instructor updated")(res);
  } catch (error) {
    next(error);
  }
};

const deleteInstructorController = async (req, res, next) => {
  try {
    await deleteInstructor(Number(req.params.id));

    return successResponse("Instructor deleted")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInstructorsController,
  createInstructorController,
  updateInstructorController,
  deleteInstructorController,
};
