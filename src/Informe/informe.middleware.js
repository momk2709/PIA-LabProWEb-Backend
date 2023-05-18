const { body } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

module.exports = [
  body("nombre").isLength({ min: 1 }).withMessage("El nombre es requerido."),
  body("telefono")
    .isString()
    .matches(/^\d{10}$/)
    .withMessage("El numero tiene que ser un string."),
  body("email").isEmail().withMessage("El email no es valido"),
  body("mensaje")
    .isLength({ min: 1, max: 250 })
    .withMessage("El campo no puede estar en blanco"),
  validationErrors,
];
