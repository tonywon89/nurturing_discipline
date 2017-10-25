exports.checkAuthenticated = function (req, res, next) {
   if (!req.user) {
    res.status(400).send("Not Authorized");
  } else {
    next();
  }
}
