const jwt = require("jsonwebtoken");
const User = require("../models/userModelSchema");

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(id).select("-password");
      next();
    } catch (err) {
      res.status(401).send({
        success: "failure",
        error: "Unauthorized User" + err.message,
      });
    }
  }
  if (!token) {
    res.status(401).send({
      success: "failure",
      error: "Unauthorized User No token",
    });
  }
};

module.exports = { checkUserAuth };
