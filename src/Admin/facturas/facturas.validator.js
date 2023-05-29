const { body, param } = require("express-validator");
const validationErrors = require("../../middlewares/validationErrors");

const bodyValidation = [
  body("status_factura")
    .isIn(["ENVIADA", "PAGADA", "EN PROCESO", "CANCELADA"])
    .withMessage(
      "status_factura must be one of the following values: ENVIADA, PAGADA, EN PROCESO, CANCELADA"
    ),
  validationErrors,
];

const paramValidation = [
  param("id")
    .isInt()
    .withMessage("id must be an integer ")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("id must be greater than 0");
      }

      return true;
    }),
  validationErrors,
];

module.exports = {
  bodyValidation,
  paramValidation,
};
