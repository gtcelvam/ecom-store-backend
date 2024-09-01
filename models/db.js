const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const {
  DB_HOST_URL,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_CON_URI,
  DB_CERTIFICATE,
} = require("../utils/constants");
const {
  CHECK_IF_USER_TABLE_EXIST_QUERY,
  CREATE_USER_TABLE_QUERY,
} = require("../utils/sqlQueries");

const sslCertificate = DB_CERTIFICATE;

const connection = mysql.createConnection({
  uri: DB_CON_URI,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: {
    ca: sslCertificate,
    rejectUnauthorized: true, // Enable SSL for a secure connection
  },
});

connection.connect((err) => {
  if (err) return console.log("DB Connection Error!!!", JSON.stringify(err));

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
