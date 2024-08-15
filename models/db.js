const mysql = require("mysql2");
const {
  DB_HOST_URL,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = require("../utils/constants");
const {
  CHECK_IF_USER_TABLE_EXIST_QUERY,
  CREATE_USER_TABLE_QUERY,
} = require("../utils/sqlQueries");

const connection = mysql.createConnection({
  host: DB_HOST_URL,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
});

connection.connect((err) => {
  if (err) return console.log("DB Connection Error!!!", err);

  connection.query(CHECK_IF_USER_TABLE_EXIST_QUERY, (err, results) => {
    if (err) console.log("Check table exits error : ", err);

    if (!Boolean(results.length)) {
      connection.query(CREATE_USER_TABLE_QUERY, (err, results) => {
        if (err) console.log("Create user table error : ", err);
        console.log("User table created successfully!!!");
      });
    }
  });
});

const handleDBConnection = () => connection;

module.exports = { handleDBConnection, connection };
