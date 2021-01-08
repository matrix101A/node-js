const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node",
  password: "Abhinavabhinav1",
  port: 3306,
});

module.exports = pool.promise();
