const userLogin = require("../assets/userLogin");
const jwt = require("jsonwebtoken");
require("dotenv").config();


let currentUser = {
  "id":"",
  "username":"",
  "password":"",
  "email":"",
  "isAdmin":""
}

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
  var foundUser = userLogin.findUser(
    req.body,
    (result) => {
       console.log(result);
      
      currentUser= JSON.parse(JSON.stringify(result))[0]
      console.log(currentUser.isAdmin)
      console.log(currentUser)
      let admin = false;
      if(currentUser.isAdmin){
        admin = true;
      }
      let payload = {
        admin
      }
      
      if (result.length) {
        const accessToken = jwt.sign(
          payload ,
          process.env.JWT_KEY
        );
        console.log(accessToken)
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