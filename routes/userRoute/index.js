const UserRoute = require("express").Router();
const UserController = require("../../controllers/user");

UserRoute.get("/user/get-all-users", UserController.getAllUsers);
UserRoute.get("/user/:id", UserController.getUserById);
UserRoute.post("/user", UserController.addNewUser);
UserRoute.patch("/user/:id", UserController.updateUser);
UserRoute.delete("/user/:id", UserController.deleteUser);

module.exports = UserRoute;
