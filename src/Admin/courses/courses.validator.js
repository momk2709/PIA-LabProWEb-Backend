const { body, param } = require("express-validator");
const validationErros = require("../../middlewares/validationErrors");

const createBodyValidator = [
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
    .isLength({
      min: 1,
      max: 250,
    })
    .withMessage(
      "La descripción del curso debe tener entre 1 y 230 caracteres"
    ),
  body("precio")
    .isInt()
    .withMessage("El precio del curso debe ser un número entero")
    .custom((value) => {
      if (value <= 0) throw new Error("El precio debe ser positivo");
      return true;
    }),
  body("fecha_inicio")
    .isISO8601()
    .withMessage(
      "La fecha de inicio del curso debe ser una fecha válida en formato ISO8601"
    ),
  body("fecha_fin")
    .isISO8601()
    .withMessage(
      "La fecha de fin del curso debe ser una fecha válida en formato ISO8601"
    )
    .custom((value, { req }) => {
      const fechaInicio = new Date(req.body.fecha_inicio);
      const fechaFin = new Date(value);
      if (fechaFin <= fechaInicio) {
        throw new Error(
          "La fecha de fin debe ser posterior a la fecha de inicio"
        );
      }
      return true;
    }),
  validationErros,
];

const updateBodyValidator = [
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
    .isLength({
      min: 1,
      max: 250,
    })
    .withMessage(
      "La descripción del curso debe tener entre 1 y 230 caracteres"
    ),
  body("precio")
    .isInt()
    .withMessage("El precio del curso debe ser un número entero")
    .custom((value) => {
      if (value <= 0) throw new Error("El precio debe ser positivo");
      return true;
    }),
  body("fecha_inicio")
    .isISO8601()
    .withMessage(
      "La fecha de inicio del curso debe ser una fecha válida en formato ISO8601"
    ),
  body("fecha_fin")
    .isISO8601()
    .withMessage(
      "La fecha de fin del curso debe ser una fecha válida en formato ISO8601"
    )
    .custom((value, { req }) => {
      const fechaInicio = new Date(req.body.fecha_inicio);
      const fechaFin = new Date(value);
      if (fechaFin <= fechaInicio) {
        throw new Error(
          "La fecha de fin debe ser posterior a la fecha de inicio"
        );
      }
      return true;
    }),
  validationErros,
];

const paramIdValidator = [
  param("id")
    .isInt()
    .withMessage("El id del curso es requerido")
    .custom((value) => {
      if (value <= 0) throw new Error("El id debe ser positivo");
      return true;
    }),
  validationErros,
];

module.exports = {
  createBodyValidator,
  updateBodyValidator,
  paramIdValidator,
};
