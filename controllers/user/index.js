const { connection } = require("../../models/db");
const { getSuccessMessage, getErrorMessage } = require("../../utils/helpers");
const {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  INSERT_NEW_USER,
  UPDATE_USER_BY_ID,
  DELETE_USER_BY_ID,
} = require("../../utils/sqlQueries/users");

exports.getAllUsers = (req, res) => {
  try {
    connection.query(GET_ALL_USERS, (err, result) => {
      if (err) return console.log("Get all users error : ", err);
      res.status(200).json(result);
    });
  } catch (error) {
    console.log("Get all users controller error : ", error);
    getErrorMessage(res);
  }
};

exports.getUserById = (req, res) => {
  try {
    const id = req.params.id;
    connection.query(GET_USER_BY_ID, [id], (err, result) => {
      if (err) return console.log("Get user by id : ", err);
      getSuccessMessage(res, result);
    });
  } catch (error) {
    console.log("Get all users controller error : ", error);
    getErrorMessage(res);
  }
};

exports.addNewUser = (req, res) => {
  try {
    const payload = req.body;
    connection.query(INSERT_NEW_USER, payload, (err, result) => {
      if (err) return console.log("Insert new user error : ", err);
      getSuccessMessage(res, result);
    });
  } catch (error) {
    console.log("add new user controller error : ", error);
    getErrorMessage(res);
  }
};

exports.updateUser = (req, res) => {
  try {
    const payload = req.body;
    const id = req.params.id;
    connection.query(UPDATE_USER_BY_ID, [payload, id], (err, result) => {
      if (err) return console.log("Insert new user error : ", err);
      getSuccessMessage(res, result);
    });
  } catch (error) {
    console.log("update user controller error : ", error);
    getErrorMessage(res);
  }
};

exports.deleteUser = (req, res) => {
  try {
    const id = req.params.id;
    connection.query(DELETE_USER_BY_ID, [id], (err, result) => {
      if (err) return console.log("delete user error : ", err);
      getSuccessMessage(res, result);
    });
  } catch (error) {
    console.log("delete user controller error : ", error);
    getErrorMessage(res);
  }
};
