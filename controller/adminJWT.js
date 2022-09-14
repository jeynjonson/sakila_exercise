const jwt = require("jsonwebtoken");

require("dotenv").config();
var admin = false
const adminJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);


  jwt.verify(authHeader, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.admin;
    admin = decoded.admin
    console.log(decoded.admin);
    if(admin){
      next();
    } else{
    return res.sendStatus(403);
    }
    
  });
};


module.exports = adminJWT