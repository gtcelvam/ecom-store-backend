const GET_ALL_USERS = `SELECT * FROM users`;
const GET_USER_BY_ID = `SELECT * FROM users WHERE id = ?`;
const INSERT_NEW_USER = `INSERT INTO users SET ?`;
const UPDATE_USER_BY_ID = `UPDATE users SET ? WHERE id = ?`;
const DELETE_USER_BY_ID = `DELETE FROM users WHERE id = ?`;

module.exports = {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  INSERT_NEW_USER,
  UPDATE_USER_BY_ID,
  DELETE_USER_BY_ID,
};
