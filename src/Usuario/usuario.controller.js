const { successResponse } = require("../handlers/responseHandlers");
const { getUser, getUserFactura } = require("./usuario.services");

const getUserController = async (req, res, next) => {
  try {
    const user = await getUser(parseInt(req.user));
    return successResponse(user, "Perfil obtenido")(res);
  } catch (error) {
    next(error);
  }
};
const getUserFacturaController = async (req, res, next) => {
  try {
    const factura = await getUserFactura(parseInt(req.user));
    return successResponse(factura, "Factura obtenida")(res);
  } catch (error) {
    next(error);
  }
};
const getUserCourseController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserController,
  getUserFacturaController,
  getUserCourseController,
};
