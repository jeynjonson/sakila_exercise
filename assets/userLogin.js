const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sakila_user",
});


db.connect(function(err){
    if(err){
        throw err;
    }
});

let userLogin= {
  findUser: function (userObject, resolve, reject) {
    let sql = "SELECT * FROM users WHERE username LIKE '%"+userObject.username+"%' AND password LIKE '%"+userObject.password+"%' AND email LIKE '%"+userObject.email+"%'";
    db.query(sql, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  },
};

module.exports = userLogin;