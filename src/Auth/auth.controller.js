const { register, login, me } = require("./auth.services");
const {
  createdResponse,
  successResponse,
} = require("../handlers/responseHandlers");
const registerController = async (req, res, next) => {
  try {
    const user = await register(req.body);
    return createdResponse(user, "Usuario creado con exito!")(res);
  } catch (error) {
    next(error);
  }
};
const loginController = async (req, res, next) => {
  try {
    const token = await login(req.body);
    return createdResponse({ token }, "Inicio de sesión exitoso!")(res);
  } catch (error) {
    next(error);
  }
};
const meController = async (req, res, next) => {
  try {
    const data = await me(parseInt(req.user));
    return successResponse(data)(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  meController,
};
