function errorHandler(err, req, res, next) {
  const code = res.statusCode;
  let error = { message: err.message };

  res.statusCode = (code === 200) ? 500 : code;
  res.send({ error });
}

module.exports = errorHandler;