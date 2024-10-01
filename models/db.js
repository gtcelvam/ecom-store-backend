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
  CHECK_IF_CART_TABLE_EXIST_QUERY,
  CREATE_CART_TABLE_QUERY,
} = require("../utils/sqlQueries");

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
      const userTable = connection.query(CHECK_IF_USER_TABLE_EXIST_QUERY);
      const cartTable = connection.query(CHECK_IF_CART_TABLE_EXIST_QUERY);

      const tableQueryList = {
        0: {
          check: userTable,
          createQuery: CREATE_USER_TABLE_QUERY,
        },
        1: {
          check: cartTable,
          createQuery: CREATE_CART_TABLE_QUERY,
        },
      };

      const tableCountResult = await Promise.all([
        tableQueryList[0].check,
        tableQueryList[1].check,
      ]);

      tableCountResult.forEach((item, index) => {
        if (!Boolean(item[0].length)) {
          connection.query(tableQueryList[index].createQuery);
          console.log("Table created successfully!!!");
        }
      });
    } catch (error) {
      console.log("CheckIfUserTableAvailable Error : ", error);
    }
  };

  CheckIfUserTableAvailable();
  return connection;
};
handleDBConnection();

module.exports = { handleDBConnection };
