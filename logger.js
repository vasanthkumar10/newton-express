function logger(req, res, next) {
  console.log("logging middleware.....");
  next();
}

module.exports = logger;
