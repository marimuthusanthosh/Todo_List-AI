const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const { signup } = require("../db/index");

const todoMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const username = decoded.username; 
    
    const user= await signup.findOne({ username })
     
    if (!user) {
      return res.status(403).json({ message: "user not found" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = {todoMiddleware};