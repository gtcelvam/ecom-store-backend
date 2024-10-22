const { handleDBConnection } = require("../../models/db");
const { getCartDetailsByUserId } = require("../../utils/actions/cart");
const {
  getErrorMessage,
  getSuccessMessage,
  handleGenerateUUID,
} = require("../../utils/helpers");
const {
  getProductListByIds,
  getProductById,
} = require("../../utils/shopify/actions/productActions");
const {
  INSERT_CART_QUERY,
  SELECT_ALL_CART_QUERY,
  UPDATE_USER_WITH_CART,
  CHECK_IF_CART_AVAILABLE_BY_USER,
  SELECT_CART_BY_USERID,
  UPDATE_PRODUCT_LIST_IN_CART,
  SELECT_ALL_FROM_CART_BY_USERID,
  DELETE_PRODUCT_ID_FROM_JSON,
  CLEAR_CART_BY_USERID,
} = require("../../utils/sqlQueries/carts");

class CartDB {
  constructor() {
    this.conn = async () => await handleDBConnection();
  }

  createNewCart = async (req, res) => {
    const connection = await this.conn();
    try {
      const { userId, productId } = req.body;
      await connection.beginTransaction();
      const id = handleGenerateUUID();

      const [data] = await connection.execute(CHECK_IF_CART_AVAILABLE_BY_USER, [
        userId,
      ]);

      const isCartAvailable = data[0].count > 0;
      if (isCartAvailable) {
        const result = await this.getCartDetailsByUserId(req, res);
        const [data] = result;
        const productIdList = data[0]?.productId || [];
        const updatedProductList = [...productIdList, ...productId];
        const updatedResult = await this.updateProductIdListInCart(
          userId,
          updatedProductList
        );
        const productData = await getProductById(productId[0]);
        getSuccessMessage(res, productData);
        return;
      }

      //update cart
      await connection.execute(INSERT_CART_QUERY, [id, userId, productId]);

      //update user
      await connection.execute(UPDATE_USER_WITH_CART, [id, userId]);

      // Commit the transaction
      await connection.commit();
      const productData = await getProductById(productId[0]);
      getSuccessMessage(res, productData);
    } catch (error) {
      await connection.rollback();
      getErrorMessage(res, error);
    } finally {
      connection.end();
    }
  };

  getCartDetailsById = async (req, res) => {
    const connection = await this.conn();
    const userId = req.params.id;
    try {
      const result = await connection.query(SELECT_CART_BY_USERID, [userId]);
      const productIdList = result[0][0]?.productId || [];
      const productListResult = await getProductListByIds(productIdList);
      getSuccessMessage(res, productListResult);
    } catch (error) {
      console.log("Get Cart Details By User Id Error : ", error);
      getErrorMessage(res, error);
    } finally {
      connection.end();
    }
  };

  getAllCartDetails = async (req, res) => {
    try {
      const connection = await this.conn();
      const result = await connection.query(SELECT_ALL_CART_QUERY);
      getSuccessMessage(res, result[0]);
    } catch (error) {
      getErrorMessage(res);
      console.log("Select All Cart Error : ", error);
    }
  };

  getCartDetailsByUserId = async (req, res) => {
    const connection = await this.conn();
    try {
      const { userId } = req.body;
      const result = await connection.query(SELECT_CART_BY_USERID, [userId]);
      return result;
    } catch (error) {
      console.log("Get Cart By User Id : ", error);
      return new Error(error);
    }
  };

  updateProductIdListInCart = async (userId, productList) => {
    const connection = await this.conn();
    try {
      const result = await connection.query(UPDATE_PRODUCT_LIST_IN_CART, [
        JSON.stringify(productList),
        userId,
      ]);
      return result;
    } catch (error) {
      console.log("Update Product Id List In Cart Error : ", error);
      return new Error(error);
    }
  };

  deleteProductIdFromCart = async (req, res) => {
    const connection = await this.conn();
    try {
      const { userId, productId } = req.body;
      await connection.query(DELETE_PRODUCT_ID_FROM_JSON, [productId, userId]);

      const response = {
        status: true,
        id: productId,
      };

      getSuccessMessage(res, response);
    } catch (error) {
      console.log("Delete Product id from cart error : ", error);
      getErrorMessage(res, error);
    }
  };

  clearCartByUserId = async (req, res) => {
    const connection = await this.conn();
    try {
      const userId = req.params.id;
      const [data] = await connection.query(CLEAR_CART_BY_USERID, [
        JSON.stringify([]),
        userId,
      ]);
      getSuccessMessage(res, []);
    } catch (error) {
      console.log("Clear Cart By User Id Error : ", error);
      getErrorMessage(res, error);
    }
  };
}

const cartConnection = new CartDB();

module.exports = cartConnection;
