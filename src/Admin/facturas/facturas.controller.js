const { successResponse } = require("../../handlers/responseHandlers");
const { getAllFacturas, updateFactura } = require("./facturas.services");

const getAllFacturasController = async (req, res, next) => {
  try {
    const facturas = await getAllFacturas();

    return successResponse({ facturas }, "All facturas")(res);
  } catch (error) {
    next(error);
  }
};
const updateFacturaController = async (req, res, next) => {
  try {
    const factura = await updateFactura(Number(req.params.id), req.body);

    return successResponse({ factura }, "Factura updated")(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFacturasController,
  updateFacturaController,
};
