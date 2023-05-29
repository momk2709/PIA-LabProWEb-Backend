const { successResponse } = require("../../handlers/responseHandlers");

const getAllFacturasController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
const updateFacturaController = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFacturasController,
  updateFacturaController,
};
