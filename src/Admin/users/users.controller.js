const { successResponse } = require("../../handlers/responseHandlers");
const { getAllUsers } = require("./users.handler");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    return successResponse(users, "Usuarios obtenidos")(res);
  } catch (error) {
    next(error);
  }
};
const createUserController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const updateUserController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const deleteUserController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
};
