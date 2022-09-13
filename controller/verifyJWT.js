const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  console.log(authHeader);

  jwt.verify(authHeader, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;