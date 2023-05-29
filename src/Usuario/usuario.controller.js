const { successResponse } = require("../handlers/responseHandlers");
const { getUserProfile } = require("./usuario.services");

const getUserProfileController = async (req, res, next) => {
  try {
    const user = await getUserProfile(Number(req.user));
    return successResponse(user, "Perfil obtenido")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfileController,
};
