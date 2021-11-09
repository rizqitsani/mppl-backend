const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const errorFormatter = ({ location, msg, param }) =>
  `${location}[${param}]: ${msg}`;

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  try {
    validationResult(req).formatWith(errorFormatter).throw();
    return next();
  } catch (err) {
    return next({ status: StatusCodes.BAD_REQUEST, message: err.array() });
  }
};

module.exports = validate;
