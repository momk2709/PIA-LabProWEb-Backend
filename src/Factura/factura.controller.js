const {
  successResponse,
  createdResponse,
  noContentResponse,
} = require("../handlers/responseHandlers");
const { createFactura } = require("./factura.services");

const postFacturaController = async (req, res, next) => {
  try {
    const factura = await createFactura(req.body);
    return createdResponse({ factura })(res);
  } catch (error) {
    next(error);
  }
};

module.exports = { postFacturaController };
