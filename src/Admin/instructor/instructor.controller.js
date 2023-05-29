const { successResponse } = require("../../handlers/responseHandlers");
const { getAllInstructor, updateInstructor } = require("./instructor.handler");

const getAllInstructorController = async (req, res, next) => {
  try {
    const instructor = await getAllInstructor();
    return successResponse(instructor, "Instructores obtenidos")(res);
  } catch (error) {
    next(error);
  }
};
const updateInstructorController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const createInstructorController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const deleteInstructorController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInstructorController,
  updateInstructorController,
  createInstructorController,
  deleteInstructorController,
};
