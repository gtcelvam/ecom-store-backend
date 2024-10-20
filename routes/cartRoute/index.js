const CartRoute = require("express").Router();
const CartController = require("../../controllers/cart");
const { verifyToken } = require("../../utils/auth");

CartRoute.post("/cart", verifyToken, CartController.createNewCart);
CartRoute.get("/cart/:id", verifyToken, CartController.getCartDetailsById);
CartRoute.get("/all-carts", verifyToken, CartController.getAllCartDetails);
CartRoute.delete("/cart", verifyToken, CartController.deleteProductIdFromCart);
CartRoute.get("/clear-cart/:id", verifyToken, CartController.clearCartByUserId);

module.exports = CartRoute;
