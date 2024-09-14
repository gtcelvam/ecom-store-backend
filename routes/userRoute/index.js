const UserRoute = require("express").Router();
const UserController = require("../../controllers/user");
const { verifyToken, verifyLoginToken } = require("../../utils/auth");

UserRoute.get("/user", verifyLoginToken, UserController.getUserDetails);
UserRoute.get("/user/get-all-users", verifyToken, UserController.getAllUsers);
UserRoute.get("/user/:id", verifyToken, UserController.getUserById);
UserRoute.post("/user", UserController.addNewUser);
UserRoute.post("/login", UserController.loginHandler);
UserRoute.patch("/user/:id", verifyToken, UserController.updateUser);
UserRoute.delete("/user/all-user", verifyToken, UserController.deleteAllUser);
UserRoute.delete("/user/:id", verifyToken, UserController.deleteUser);

module.exports = UserRoute;
