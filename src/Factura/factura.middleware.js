const { body } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

const createFacturaValidator = [
  body("fecha")
    .isISO8601()
    .withMessage(
      "La fecha de inicio del curso debe ser una fecha válida en formato ISO8601"
    ),
  body("rfc")
    .trim()
    .notEmpty()
    .withMessage("El nombre del curso es obligatorio"),
  body("precio")
    .isDecimal({ decimal_digits: "2" })
    .withMessage("El precio del curso debe ser un número con dos decimales")
    .isFloat({ min: 0 })
    .withMessage("El precio del curso debe ser mayor o igual a cero"),
  validationErrors,
];

module.exports = { createFacturaValidator };
