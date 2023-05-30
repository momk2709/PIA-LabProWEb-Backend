const { successResponse } = require("../handlers/responseHandlers");
const {
  getUserProfile,
  getFactura,
  editFactura,
} = require("./usuario.services");

const getUserProfileController = async (req, res, next) => {
  try {
    const user = await getUserProfile(Number(req.user));
    return successResponse(user, "Perfil obtenido")(res);
  } catch (error) {
    next(error);
  }
};

const getUserfacturaController = async (req, res, next) => {
  try {
    const factura = await getFactura(Number(req.params.id));

    return successResponse({ factura }, "Factura obtenida")(res);
  } catch (error) {
    next(error);
  }
};

const editUserFacturaController = async (req, res, next) => {
  try {
    const factura = await editFactura(Number(req.params.id), req.body);

    return successResponse({ factura }, "Factura editada")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfileController,
  getUserfacturaController,
  editUserFacturaController,
};
