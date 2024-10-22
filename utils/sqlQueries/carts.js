const INSERT_CART_QUERY =
  "INSERT INTO carts (id,userId,productId) VALUES (?,?,?)";
const SELECT_CART_BY_USERID = "SELECT productId FROM carts WHERE userId = ?";
const SELECT_ALL_CART_QUERY = "SELECT * FROM carts";
const SELECT_ALL_FROM_CART_BY_USERID = "SELECT * FROM carts WHERE userId = ?";
const UPDATE_USER_WITH_CART = `
      UPDATE users 
      SET cartId = ? 
      WHERE id = ?
    `;
const UPDATE_PRODUCT_LIST_IN_CART =
  "UPDATE carts SET productId = ? WHERE userId = ?";
const CHECK_IF_CART_AVAILABLE_BY_USER =
  "SELECT COUNT(*) AS count FROM carts WHERE userid = ?";

const DELETE_PRODUCT_ID_FROM_JSON = `UPDATE carts
SET productId = JSON_REMOVE(productId, JSON_UNQUOTE(JSON_SEARCH(productId, 'one', ?))) 
WHERE userId = ?`;

const CLEAR_CART_BY_USERID = `UPDATE carts SET productId = ? WHERE userid = ?`;

module.exports = {
  CHECK_IF_CART_AVAILABLE_BY_USER,
  INSERT_CART_QUERY,
  SELECT_CART_BY_USERID,
  SELECT_ALL_CART_QUERY,
  SELECT_ALL_FROM_CART_BY_USERID,
  UPDATE_USER_WITH_CART,
  UPDATE_PRODUCT_LIST_IN_CART,
  DELETE_PRODUCT_ID_FROM_JSON,
  CLEAR_CART_BY_USERID,
};
