const { body, param } = require("express-validator");
const validationErrors = require("../../middlewares/validationErrors");

const createCourseValidator = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del curso es obligatorio"),

  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripción del curso es obligatoria"),

  body("precio")
    .isDecimal({ decimal_digits: "2" })
    .withMessage("El precio del curso debe ser un número con dos decimales")
    .isFloat({ min: 0 })
    .withMessage("El precio del curso debe ser mayor o igual a cero"),

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
  validationErrors,
];
const updateCourseValidator = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del curso es obligatorio"),

  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripción del curso es obligatoria"),

  body("precio")
    .isDecimal({ decimal_digits: "2" })
    .withMessage("El precio del curso debe ser un número con dos decimales")
    .isFloat({ min: 0 })
    .withMessage("El precio del curso debe ser mayor o igual a cero"),

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
  validationErrors,
];

const paramValidator = [
  param("courseId")
    .isInt()
    .withMessage("El Id de curso es requerida")
    .custom((value, { req }) => {
      if (value <= 0) throw new Error("El Id debe ser positivo");

      return true;
    }),
  validationErrors,
];

module.exports = {
  createCourseValidator,
  updateCourseValidator,
  paramValidator,
};
