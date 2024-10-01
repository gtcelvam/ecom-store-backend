const CartRoute = require("express").Router();
const CartController = require("../../controllers/cart");

CartRoute.post("/cart", CartController.createNewCart);
CartRoute.get("/all-carts", CartController.getAllCartDetails);

module.exports = CartRoute;
