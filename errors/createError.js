const createError = (status, message) => {
  let error = new Error(message);
  error.status = status;
  return error;
};

module.exports = createError;
