const passport = require("passport");
const { handleDBConnection } = require("../../models/db");
const {
  getUserByIdAction,
  getUserByEmailAction,
} = require("../../utils/actions/users");
const { generateToken } = require("../../utils/auth");
const {
  STATUS_CODES,
  FED_BASE_URL,
  OAUTH_KEYS,
  ACCESS_TOKEN,
} = require("../../utils/constants");
const {
  getSuccessMessage,
  getErrorMessage,
  getAuthSuccessMessage,
  handleEncryptPassword,
  handleCheckPassword,
  handleDeleteMultipleKeys,
} = require("../../utils/helpers");
const {
  GET_ALL_USERS,
  GET_USER_BY_ID,
  INSERT_NEW_USER,
  UPDATE_USER_BY_ID,
  DELETE_USER_BY_ID,
  DELETE_ALL_USER,
  GET_USER_BY_EMAIL,
} = require("../../utils/sqlQueries/users");

const { Bad_Request, Not_Modified, Not_Found } = STATUS_CODES;

class UserDB {
  constructor() {
    this.conn = async () => await handleDBConnection();
  }

  getUserDetails = async (req, res) => {
    try {
      const { email } = req.body;
      if (email) {
        const userData = await this.getUserByEmail(email);
        getSuccessMessage(res, userData);
        return;
      }
      getErrorMessage(res);
    } catch (error) {
      getErrorMessage(res);
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const connection = await this.conn();
      const result = await connection.query(GET_ALL_USERS);
      res.status(200).json(result[0]);
    } catch (error) {
      console.log("Get all users controller error : ", error);
      getErrorMessage(res);
    }
  };

  getUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const connection = await this.conn();
      const result = await connection.query(GET_USER_BY_ID, [id]);
      getSuccessMessage(res, result[0]);
    } catch (error) {
      console.log("Get all users controller error : ", error);
      getErrorMessage(res);
    }
  };

  getUserByEmail = async (email = null) => {
    if (!Boolean(email)) return [];
    try {
      const connection = await this.conn();
      const result = await connection.query(GET_USER_BY_EMAIL, [email]);
      return result[0];
    } catch (error) {
      console.log("Get user by email error : ", error);
      return error;
    }
  };

  addNewUser = async (req, res) => {
    try {
      const payload = req.body;
      const connection = await this.conn();
      const user = await this.getUserByEmail(payload.email);
      /* If email already present */
      if (Boolean(user.length))
        return getErrorMessage(
          res,
          "User with same mobile id is already there!!",
          Bad_Request.code
        );
      /* If email already present block ends here */

      /* Encrypt Password  */
      if (!payload.password)
        return getErrorMessage(res, "Password is required");
      const encryptedPassword = await handleEncryptPassword(payload.password);
      payload.password = encryptedPassword;
      /* Encrypt Password Ends Here */

      const result = await connection.query(INSERT_NEW_USER, payload);
      const id = result[0]?.insertId;
      const userData = await getUserByIdAction(connection, id);
      delete userData[0]?.password;
      const token = generateToken(userData[0]);
      getAuthSuccessMessage(res, userData, token);
    } catch (error) {
      console.log("add new user controller error : ", error);
      getErrorMessage(res);
    }
  };

  updateUser = async (req, res) => {
    try {
      const payload = req.body;
      const id = req.params.id;
      const connection = await this.conn();
      const result = await connection.query(UPDATE_USER_BY_ID, [payload, id]);
      getSuccessMessage(res, result);
    } catch (error) {
      console.log("update user controller error : ", error);
      getErrorMessage(res);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const connection = await this.conn();
      const result = await connection.query(DELETE_USER_BY_ID, [id]);
      getSuccessMessage(res, result);
    } catch (error) {
      console.log("delete user controller error : ", error);
      getErrorMessage(res);
    }
  };

  deleteAllUser = async (req, res) => {
    try {
      const connection = await this.conn();
      await connection.query(DELETE_ALL_USER, ["users"]);
      getSuccessMessage(res, { message: "All users deleted!!!" });
    } catch (error) {
      console.log("delete all user controller error : ", error);
      getErrorMessage(res);
    }
  };

  // Login Handlers
  loginHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      const connection = await this.conn();
      const userData = await getUserByEmailAction(connection, email);
      /* If user doesn't exist */
      if (!Boolean(userData.length)) {
        return getErrorMessage(res, "User Not Found");
      }
      const encryptedPassword = userData[0].password;
      const isPasswordMatching = await handleCheckPassword(
        password,
        encryptedPassword
      );
      if (!isPasswordMatching) {
        return getErrorMessage(res, "Password Mismatch");
      }
      /* If user doesn't exist block ends here */

      const token = generateToken(userData[0]);
      delete userData[0]?.password;
      getAuthSuccessMessage(res, userData, token);
    } catch (error) {
      console.log("Login Handler Error : ", error);
      getErrorMessage(res);
    }
  };

  //get google user
  getGoogleUser = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

  //google user callback
  handleGoogleCallback = async (req, res) => {
    try {
      const { name, email } = req.user["_json"];
      const connection = await this.conn();
      const userData = await getUserByEmailAction(connection, email);
      /* If user doesn't exist */
      if (!Boolean(userData.length)) {
        const payload = {
          name,
          email,
          source: OAUTH_KEYS.google,
        };
        const result = await connection.query(INSERT_NEW_USER, payload);
        const id = result[0]?.insertId;
        payload["id"] = id;
        handleDeleteMultipleKeys(payload, ["password", "source"]);
        const token = generateToken(payload);
        return res.redirect(FED_BASE_URL + "/?token=" + token + "&src=google");
      }
      handleDeleteMultipleKeys(userData[0], ["password", "source", "cartId"]);
      const token = generateToken(userData[0]);
      res.cookie(ACCESS_TOKEN, token, {
        secure: true, // Sent only over HTTPS
        sameSite: "Strict", // Prevent cross-site requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day in milliseconds
      });
      res.redirect(FED_BASE_URL);
      if (!userData[0].source) {
        await connection.query(UPDATE_USER_BY_ID, [
          { source: "google" },
          userData[0].id,
        ]);
        return;
      }
    } catch (error) {
      console.log("Handle Google Callback : ", error);
    }
  };
}

const userConnection = new UserDB();

module.exports = userConnection;
