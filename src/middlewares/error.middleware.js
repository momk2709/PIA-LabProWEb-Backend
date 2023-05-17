const {
  JwtError,
  InvalidTokenError,
  TokenNotProvided,
} = require("../handlers/JwtError");
const { AppError } = require("../handlers/AppError");

const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  // AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // JwtError
  if (err instanceof JwtError) {
    let statusCode = 500;
    let message = "Ha ocurrido un error inesperado";
    let status = "error";

    switch (err.name) {
      case InvalidTokenError.name:
      case TokenNotProvided.name:
        statusCode = 401;
        message = err.message;
        break;
    }

    return res.status(statusCode).json({
      status,
      message,
    });
  }

  // Error
  res.status(500).json({
    status: "error",
    message: "Ha ocurrido un error inesperado",
  });
};

module.exports = errorHandler;
