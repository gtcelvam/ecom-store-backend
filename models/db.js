const mysql = require("mysql2/promise");
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
const { GET_ALL_USERS, INSERT_NEW_USER } = require("../utils/sqlQueries/users");

const sslCertificate = DB_CERTIFICATE;

const handleDBConnection = async () => {
  const connection = await mysql.createConnection({
    uri: DB_CON_URI,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: {
      ca: sslCertificate,
      rejectUnauthorized: false, // Enable SSL for a secure connection
    },
  });

  const CheckIfUserTableAvailable = async () => {
    try {
      const results = await connection.query(CHECK_IF_USER_TABLE_EXIST_QUERY);
      if (!Boolean(results.length)) {
        connection.query(CREATE_USER_TABLE_QUERY);
        console.log("User table created successfully!!!");
      }
    } catch (error) {
      console.log("CheckIfUserTableAvailable Error : ", error);
    }
  };

  CheckIfUserTableAvailable();
  return connection;
};

module.exports = { handleDBConnection };
