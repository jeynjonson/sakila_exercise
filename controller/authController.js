const userLogin = require("../assets/userLogin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const user = {
    "username": `${req.body.username}`,
    "password": `${req.body.password}`,
    "email": `${req.body.email}`
  };

  if (!user.username || !user.password || !user.email) {
    return res
      .status(400)
      .json({ message: "Credentials are required" });
  }
  const foundUser = userLogin.findUser(
    req.body,
    (result) => {
      console.log(result);
      if (result.length) {
        const accessToken = jwt.sign(
          { username: result.email },
          process.env.JWT_KEY
        );
        res.json({
          accessToken,
        });
      }
    },
    (err) => {
      next(err);
    }
  );

};

module.exports = { handleLogin };