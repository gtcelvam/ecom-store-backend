const { SELECT_CART_BY_USERID } = require("../../sqlQueries/carts");

const getCartDetailsByUserId = async (connection, userId) => {
  try {
    const data = await connection.query(SELECT_CART_BY_USERID, [userId]);
    return data;
  } catch (error) {
    return new Error(error);
  }
};

module.exports = { getCartDetailsByUserId };
