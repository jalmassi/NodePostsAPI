let appError = require("../errors/appError");
let errors = require("../errors/commonErrors");
let createError = require("../errors/createError");

const handleErrors = (err, req, res, next) => {
  if (err instanceof appError) {
    let filteredErrors = errors.filter((error) => {
      return error.statusCode === err.statusCode;
    });
    console.log(`${filteredErrors.length}`);
    if (filteredErrors.length) {
      let { status, message, statusCode } = filteredErrors[0];
      return res.status(statusCode).json({
        status: status,
        message: message,
        details: err.message,
      });
    } else {
      return res.status(statusCode).json({
        status: err.statusCode ? err.statusCode : 500,
        message: err.message ? err.message : "Unknown error",
      });
    }
  }

  if (err instanceof Error) {
    const newError = createError(err.statusCode, err);
    const code = newError.statusCode || 500;
    return res.status(code).json({
      status: newError.statusCode ? newError.statusCode : 500,
      message: newError.message ? newError.message : "Unknown error",
    });
  }
};

module.exports = handleErrors;
