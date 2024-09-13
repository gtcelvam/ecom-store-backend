const { GET_USER_BY_EMAIL, GET_USER_BY_ID } = require("../../sqlQueries/users");

module.exports.getUserByIdAction = async (connection, id = null) => {
  if (!id) return null;
  try {
    const result = await connection.query(GET_USER_BY_ID, [id]);
    return result[0];
  } catch (error) {
    console.log("Get User By Id Action : ", error);
  }
};

module.exports.getUserByEmailAction = async (connection, email = null) => {
  if (!Boolean(email)) return [];
  try {
    const result = await connection.query(GET_USER_BY_EMAIL, [email]);
    return result[0];
  } catch (error) {
    console.log("Get user by email action error : ", error);
    return error;
  }
};
