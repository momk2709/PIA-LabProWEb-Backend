const { body, param } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

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

const updateValidation = [
  body("rfc")
    .isString()
    .withMessage("rfc must be a string")
    .isLength({ min: 1, max: 255 })
    .withMessage("rfc must not be empty"),
  validationErrors,
];

module.exports = {
  paramValidation,
  updateValidation,
};
