const { verifyToken } = require("../../../utils/auth");
const {
  getSuccessMessage,
  getErrorMessage,
} = require("../../../utils/helpers");
const { createOrder } = require("../../../utils/shopify/actions/orderActions");

const OrderRoute = require("express").Router();

//Create Order
OrderRoute.post("/order", verifyToken, async (req, res, next) => {
  try {
    const orderData = req.body;
    const result = await createOrder(orderData);
    getSuccessMessage(res, result);
  } catch (error) {
    // getErrorMessage(res, error);
    next(error);
  }
});

module.exports = OrderRoute;
