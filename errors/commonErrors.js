module.exports = [
  {
    status: "BAD_REQUEST",
    message: "Bad request",
    statusCode: 400,
  },
  {
    status: "UNAUTHORIZED",
    message: "Unauthorized",
    statusCode: 401,
  },
  {
    status: "FORBIDDEN",
    message: "Forbidden",
    statusCode: 403,
  },
  {
    status: "RESOURCE_NOT_FOUND",
    message: "Resource not found",
    statusCode: 404,
    meta: {
      translationKey: "app.common.error.RESOURCE_NOT_FOUND",
    },
  },

  // Predefined 5xx http errors
  {
    status: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong, Please try again later.",
    statusCode: 500,
    meta: {
      shouldRedirect: true,
    },
  },
  {
    status: "BAD_GATEWAY",
    message: "Bad gateway",
    statusCode: 502,
  },
  {
    status: "SERVICE_UNAVAILABLE",
    message: "Service unavailable",
    statusCode: 503,
  },
  {
    status: "GATEWAY_TIMEOUT",
    message: "Gateway timeout",
    statusCode: 504,
  },
];
