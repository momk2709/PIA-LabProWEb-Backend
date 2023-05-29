const successResponse = require("../handlers/responseHandlers");
const { getUsuario, getFactura } = require("./usuario.services");

const getUsuarioController = async (req, res, next) => {
  try {
    const usuario = await getUsuario(parseInt(req.usuario));
    return successResponse(usuario, "Exito")(res);
  } catch (error) {
    next(error);
  }
};
const getFacturaController = async (req, res, next) => {
  try {
    const factura = await getFactura(parseInt(req.factura));
    return successResponse(factura, "Exito")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsuarioController, getFacturaController };
