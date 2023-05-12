const { body } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");
const registerValidator = [
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
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden.");
    }
    return true;
  }),
  validationErrors,
];
const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("El email no es válido.")
    .exists()
    .withMessage("El email es requerido."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener un mínimo de 6 caracteres."),
  validationErrors,
];
module.exports = { registerValidator, loginValidator };
