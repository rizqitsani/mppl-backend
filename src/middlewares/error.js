const { StatusCodes } = require('http-status-codes');
const config = require('../config');
const ApiError = require('../errors/ApiError');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
// eslint-disable-next-line no-unused-vars
const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || StatusCodes[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (config.env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

/**
 * If error is not an instanceOf ApiError, convert it.
 * @public
 */
// eslint-disable-next-line no-unused-vars
exports.converter = (err, req, res, next) => {
  let convertedError = err;

  if (!(err instanceof ApiError)) {
    convertedError = new ApiError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
// eslint-disable-next-line no-unused-vars
exports.notFound = (req, res, next) => {
  const err = new ApiError({
    message: 'Not found',
    status: StatusCodes.NOT_FOUND,
  });
  return handler(err, req, res);
};
