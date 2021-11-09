exports.login = async (req, res, next) => {
  try {
    return res.json('Hello, world!');
  } catch (error) {
    return next(error);
  }
};
