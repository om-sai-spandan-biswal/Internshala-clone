require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtpass = process.env.JWT_SECRATE;

module.exports = verifyLogin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  try {
    const { id } = jwt.verify(token, jwtpass);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User Not Exist" });
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
