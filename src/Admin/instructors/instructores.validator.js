const { body, param } = require("express-validator");
const validationErrors = require("../../middlewares/validationErrors");

const instructorBodyValidator = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del curso es obligatorio"),
  body("email")
    .isEmail()
    .withMessage("El email no es válido.")
    .exists()
    .withMessage("El email es requerido."),
  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripción del instructor es obligatoria"),
  body("telefono")
    .isString()
    .withMessage("El telefono tiene que ser un string.")
    .matches(/^\d{10}$/)
    .withMessage("El telefono tiene que tener 10 caracteres"),
  body("imagenUrl").isString().withMessage("La imagen debe ser un string"),
  validationErrors,
];
const paramValidator = [
  param("id")
    .isInt()
    .withMessage("Se requiere Id valido")
    .custom((value, { req }) => {
      if (value <= 0) throw new Error("El Id debe ser positivo");

      return true;
    }),
  validationErrors,
];

module.exports = {
  instructorBodyValidator,
  paramValidator,
};
