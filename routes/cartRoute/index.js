const CartRoute = require("express").Router();
const CartController = require("../../controllers/cart");
const { verifyToken } = require("../../utils/auth");

CartRoute.post("/cart", verifyToken, CartController.createNewCart);
CartRoute.get("/cart/:id", verifyToken, CartController.getCartDetailsById);
CartRoute.get("/all-carts", verifyToken, CartController.getAllCartDetails);

module.exports = CartRoute;
