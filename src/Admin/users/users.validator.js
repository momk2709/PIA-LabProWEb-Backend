const { body, param } = require("express-validator");
const validationErrors = require("../../middlewares/validationErrors");

const createBodyValidator = [
  body("nombre")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("El campo nombre solo puede contener letras"),
  body("email")
    .isEmail()
    .withMessage("El email no es válido.")
    .exists()
    .withMessage("El email es requerido."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener un mínimo de 6 caracteres."),
  body("rol")
    .isIn(["ADMIN", "USER"])
    .withMessage("El rol debe ser ADMIN o USER"),
  validationErrors,
];

const updateBodyValidator = [
  body("nombre")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("El campo nombre solo puede contener letras"),
  body("email")
    .isEmail()
    .withMessage("El email no es válido.")
    .exists()
    .withMessage("El email es requerido."),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener un mínimo de 6 caracteres."),
  body("rol")
    .isIn(["ADMIN", "USER"])
    .withMessage("El rol debe ser ADMIN o USER"),
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

module.exports = { createBodyValidator, updateBodyValidator, paramValidator };

