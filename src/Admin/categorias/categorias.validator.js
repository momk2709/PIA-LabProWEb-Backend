const { body, param } = require("express-validator");
const validationErrors = require("../../middlewares/validationErrors");

const bodyValidator = [
  body("nombre")
    .isString()
    .notEmpty()
    .withMessage("El nombre del curso es obligatorio")
    .isLength({ min: 1, max: 250 })
    .withMessage("El nombre del curso debe tener entre 1 y 250 caracteres"),
  body("descripcion")
    .isString()
    .notEmpty()
    .withMessage("La descripción del curso es obligatoria")
    .isLength({ min: 1, max: 250 })
    .withMessage(
      "La descripción del curso debe tener entre 1 y 250 caracteres"
    ),
  body("imagenUrl")
    .isString()
    .withMessage("La imagen debe ser un string")
    .optional()
    .isLength({ min: 1, max: 250 })
    .withMessage("La imagenUrl debe tener entre 1 y 250 caracteres"),
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
  bodyValidator,
  paramValidator,
};
