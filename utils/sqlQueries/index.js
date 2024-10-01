const { DB_NAME } = require("../constants");

const CREATE_USER_TABLE_QUERY = `
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          cartId CHAR(36) PRIMARY KEY DEFAULT (UUID()),
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          mobile VARCHAR(15) NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (cartId) REFERENCES carts(id)
        )
      `;

const CREATE_CART_TABLE_QUERY = `
  CREATE TABLE carts (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    userId INT,
    productId JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) 
  )
`;

const CHECK_IF_USER_TABLE_EXIST_QUERY = `
SELECT * 
    FROM information_schema.tables 
    WHERE table_schema = '${DB_NAME}' 
    AND table_name = 'users' 
    LIMIT 1`;

const CHECK_IF_CART_TABLE_EXIST_QUERY = `
  SELECT * 
    FROM information_schema.tables 
    WHERE table_schema = '${DB_NAME}' 
    AND table_name = 'carts' 
    LIMIT 1`;

module.exports = {
  CREATE_USER_TABLE_QUERY,
  CREATE_CART_TABLE_QUERY,
  CHECK_IF_USER_TABLE_EXIST_QUERY,
  CHECK_IF_CART_TABLE_EXIST_QUERY,
};
