module.exports = (req, res, next) => {
  const err = new Error('No Memes Found Here :(');
  err.status = 404;
  next(err);
};
