const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    console.log("token not found");
    res.status(401).send("NOT AUTHORIZED");
  }

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).send("NOT AUTHORIZED - TOKEN FAILED");
    }
  }
};

module.exports.protect = protect;
