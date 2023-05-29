const { successResponse } = require("../../handlers/responseHandlers");
const {
  getAllUsers,
  createUser,
  deleteUser,
  editUser,
} = require("./users.services");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    return successResponse({ users }, "All users")(res);
  } catch (error) {
    next(error);
  }
};

const createUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    return successResponse({ user }, "User created")(res);
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const user = await editUser(Number(req.params.id), req.body);

    return successResponse({ user }, "User updated")(res);
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    await deleteUser(Number(req.params.id));

    return successResponse("User deleted")(res);
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
