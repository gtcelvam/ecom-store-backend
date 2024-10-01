const INSERT_CART_QUERY =
  "INSERT INTO carts (id,userId,productId) VALUES (?,?,?)";
const SELECT_CART_BY_USERID = "SELECT productId FROM carts WHERE userId = ?";
const SELECT_ALL_CART_QUERY = "SELECT * FROM carts";
const UPDATE_USER_WITH_CART = `
      UPDATE users 
      SET cartId = ? 
      WHERE id = ?
    `;
const UPDATE_PRODUCT_LIST_IN_CART =
  "UPDATE carts SET productId = ? WHERE userId = ?";
const CHECK_IF_CART_AVAILABLE_BY_USER =
  "SELECT COUNT(*) AS count FROM carts WHERE userid = ?";

module.exports = {
  CHECK_IF_CART_AVAILABLE_BY_USER,
  INSERT_CART_QUERY,
  SELECT_CART_BY_USERID,
  SELECT_ALL_CART_QUERY,
  UPDATE_USER_WITH_CART,
  UPDATE_PRODUCT_LIST_IN_CART,
};
