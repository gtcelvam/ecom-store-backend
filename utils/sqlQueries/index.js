const { DB_NAME } = require("../constants");

const CREATE_USER_TABLE_QUERY = `
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          mobile VARCHAR(15) NOT NULL,
          password VARCHAR(255) NOT NULL
        );
      `;

const CHECK_IF_USER_TABLE_EXIST_QUERY = `
SELECT * 
    FROM information_schema.tables 
    WHERE table_schema = '${DB_NAME}' 
    AND table_name = 'users' 
    LIMIT 1`;

module.exports = { CREATE_USER_TABLE_QUERY, CHECK_IF_USER_TABLE_EXIST_QUERY };
